/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var path_1 = require('path');
var net = require('net');
var childProcess = require('child_process');
var events_1 = require('events');
var xmldom_1 = require('xmldom');
var common_1 = require('./common');
var helper_1 = require('./helper');
var domErrorLocator = {};
var ELEMENT_NODE = 1; // Node.ELEMENT_NODE
var RubyProcess = (function (_super) {
    __extends(RubyProcess, _super);
    function RubyProcess(mode, args) {
        var _this = this;
        _super.call(this);
        this.debugSocketClient = null;
        this.pendingResponses = [];
        this.pendingCommands = [];
        this.socketConnected = false;
        this.state = common_1.SocketClientState.ready;
        this.buffer = '';
        this.parser = new xmldom_1.DOMParser({
            errorHandler: function (type, msg) { return _this.domErrorHandler(type, msg); },
            locator: domErrorLocator
        });
        this.debugSocketClient = new net.Socket({
            type: 'tcp4'
        });
        this.debugSocketClient.on('connect', function (buffer) {
            _this.state = common_1.SocketClientState.connected;
            //first thing we have to send is the start - if stopOnEntry is
            //selected, rdebug-ide stops on the first executable line
            _this.pendingCommands.forEach(function (cmd) {
                _this.pendingResponses.push(cmd);
                _this.debugSocketClient.write(cmd.command + '\n');
            });
            _this.emit('debuggerConnect');
            _this.pendingCommands = [];
        });
        this.debugSocketClient.on('end', function (ex) {
            _this.state = common_1.SocketClientState.closed;
            // Emitted when the other end of the socket sends a FIN packet.
            _this.emit('debuggerComplete');
        });
        this.debugSocketClient.on('close', function (d) {
            _this.state = common_1.SocketClientState.closed;
        });
        this.debugSocketClient.on('error', function (d) {
            var msg = 'Client: ' + d;
            _this.emit('nonTerminalError', msg);
        });
        this.debugSocketClient.on('timeout', function (d) {
            var msg = 'Timeout: ' + d;
            _this.emit('nonTerminalError', msg);
        });
        this.debugSocketClient.on('data', function (buffer) {
            _this.buffer += buffer.toString();
            var threadId;
            //ensure the dom is stable (complete)
            _this.domErrors = [];
            var document = _this.parser.parseFromString(_this.buffer, 'application/xml');
            if (_this.domErrors.length) {
                //don't report stuff we can deal with happily
                if (!(helper_1.includes(_this.domErrors[0].error, 'unclosed xml attribute', 0) ||
                    helper_1.includes(_this.domErrors[0].error, 'attribute space is required', 0) ||
                    helper_1.includes(_this.domErrors[0].error, "elements closed character '/' and '>' must be connected", 0)))
                    _this.emit('debuggerOutput', 'Debugger failed to parse: ' + _this.domErrors[0].error + "\nFor: " + _this.buffer.slice(0, 20));
                if (_this.buffer.indexOf('<eval ') >= 0 &&
                    (helper_1.includes(_this.domErrors[0].error, 'attribute space is required', 0) ||
                        helper_1.includes(_this.domErrors[0].error, "elements closed character '/' and '>' must be connected", 0))) {
                    //potentially an issue with the 'eval' tagName
                    var start = _this.buffer.indexOf('<eval ');
                    var end = _this.buffer.indexOf('" />', start);
                    if (end < 0)
                        return; //perhaps not all in yet
                    start = _this.buffer.indexOf(' value="', start);
                    if (start < 0)
                        return; //not the right structure
                    start += 8;
                    var inner = _this.buffer.slice(start, end).replace(/\"/g, '&quot;');
                    _this.buffer = _this.buffer.slice(0, start) + inner + _this.buffer.slice(end);
                    _this.domErrors = [];
                    document = _this.parser.parseFromString(_this.buffer, 'application/xml');
                }
                else
                    return; //one of the xml elements is incomplete
            }
            //if it's still bad: - we need to do something else with this
            if (_this.domErrors.length)
                return;
            for (var idx = 0; idx < document.childNodes.length; idx++) {
                var node = document.childNodes[idx];
                var attributes = {};
                if (node.attributes && node.attributes.length) {
                    for (var attrIdx = 0; attrIdx < node.attributes.length; attrIdx++) {
                        attributes[node.attributes[attrIdx].name] = node.attributes[attrIdx].value;
                    }
                    if (attributes.threadId)
                        attributes.threadId = +attributes.threadId;
                }
                //the structure here only has one or the other
                if (node.childNodes && node.childNodes.length) {
                    var finalAttributes = [];
                    //all of the child nodes are the same type in our responses
                    for (var nodeIdx = 0; nodeIdx < node.childNodes.length; nodeIdx++) {
                        var childNode = node.childNodes[nodeIdx];
                        if (childNode.nodeType !== ELEMENT_NODE)
                            continue;
                        attributes = {};
                        if (childNode.attributes && childNode.attributes.length) {
                            for (var attrIdx = 0; attrIdx < childNode.attributes.length; attrIdx++) {
                                attributes[childNode.attributes[attrIdx].name] = childNode.attributes[attrIdx].value;
                            }
                        }
                        finalAttributes.push(attributes);
                    }
                    attributes = finalAttributes;
                }
                if (['breakpoint', 'suspended', 'exception'].indexOf(node.tagName) >= 0) {
                    _this.emit(node.tagName, attributes);
                }
                else
                    _this.FinishCmd(attributes);
            }
            _this.buffer = "";
        });
        if (mode == common_1.Mode.launch) {
            var runtimeArgs = ['--evaluation-timeout', '10'];
            var runtimeExecutable;
            if (process.platform === 'win32') {
                runtimeExecutable = 'rdebug-ide.bat';
            }
            else {
                // platform: linux or darwin
                runtimeExecutable = 'rdebug-ide';
            }
            if (args.pathToRDebugIDE && args.pathToRDebugIDE !== 'rdebug-ide') {
                runtimeExecutable = args.pathToRDebugIDE;
            }
            var processCwd = args.cwd || path_1.dirname(args.program);
            var processEnv = {};
            //use process environment
            for (var env in process.env) {
                processEnv[env] = process.env[env];
            }
            //merge supplied environment
            for (var env in args.env) {
                processEnv[env] = args.env[env];
            }
            if (args.showDebuggerOutput) {
                runtimeArgs.push('-x');
            }
            if (args.debuggerPort && args.debuggerPort !== '1234') {
                runtimeArgs.push("-p " + args.debuggerPort);
            }
            if (args.stopOnEntry) {
                runtimeArgs.push('--stop');
            }
            if (args.useBundler) {
                runtimeArgs.unshift(runtimeExecutable);
                runtimeArgs.unshift('exec');
                runtimeExecutable = 'bundle';
                if (args.pathToBundler && args.pathToBundler !== 'bundle') {
                    runtimeExecutable = args.pathToBundler;
                }
            }
            // '--' forces process arguments (args.args) not to be swollowed by rdebug-ide
            this.debugprocess = childProcess.spawn(runtimeExecutable, runtimeArgs.concat(['--', args.program], args.args || []), { cwd: processCwd, env: processEnv });
            // redirect output to debug console
            this.debugprocess.stdout.on('data', function (data) {
                _this.emit('executableOutput', data);
            });
            this.debugprocess.stderr.on('data', function (data) {
                if (/^Fast Debugger/.test(data.toString())) {
                    _this.debugSocketClient.connect(args.debuggerPort || '1234');
                    if (args.showDebuggerOutput) {
                        _this.emit('debuggerOutput', data);
                    }
                }
                else {
                    _this.emit('executableStdErr', data);
                }
            });
            this.debugprocess.on('exit', function () {
                _this.emit('debuggerProcessExit');
            });
            this.debugprocess.on('error', function (error) {
                _this.emit('terminalError', "Process failed: " + error.message);
            });
        }
        else {
            this.debugSocketClient.connect(args.remotePort, args.remoteHost);
        }
    }
    RubyProcess.prototype.domErrorHandler = function (type, error) {
        this.domErrors.push({
            lineNumber: domErrorLocator.lineNumber,
            columnNumber: domErrorLocator.columnNumber,
            error: error,
            type: type
        });
    };
    Object.defineProperty(RubyProcess.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (newState) {
            this._state = newState;
        },
        enumerable: true,
        configurable: true
    });
    RubyProcess.prototype.Run = function (cmd) {
        if (this.state !== common_1.SocketClientState.connected) {
            var newCommand = {
                command: cmd,
                resolve: function () { return 0; },
                reject: function () { return 0; }
            };
            this.pendingCommands.push(newCommand);
        }
        else {
            this.debugSocketClient.write(cmd + '\n');
        }
    };
    RubyProcess.prototype.Enqueue = function (cmd) {
        var _this = this;
        var pro = new Promise(function (resolve, reject) {
            var newCommand = {
                command: cmd,
                resolve: resolve,
                reject: reject
            };
            if (_this.state !== common_1.SocketClientState.connected) {
                _this.pendingCommands.push(newCommand);
            }
            else {
                _this.pendingResponses.push(newCommand);
                _this.debugSocketClient.write(newCommand.command + '\n');
            }
        });
        return pro;
    };
    RubyProcess.prototype.FinishCmd = function (result) {
        if (this.pendingResponses.length > 0) {
            this.pendingResponses[0].resolve(result);
            this.pendingResponses.shift();
        }
    };
    return RubyProcess;
}(events_1.EventEmitter));
exports.RubyProcess = RubyProcess;
//# sourceMappingURL=ruby.js.map