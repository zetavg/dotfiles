'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Extension.ts is a lightweight wrapper around ModeHandler. It converts key
 * events to their string names and passes them on to ModeHandler via
 * handleKeyEvent().
 */
const vscode = require("vscode");
const _ = require("lodash");
const main_1 = require("./src/cmd_line/main");
const modeHandler_1 = require("./src/mode/modeHandler");
const taskQueue_1 = require("./src/taskQueue");
const position_1 = require("./src/motion/position");
const globals_1 = require("./src/globals");
const notation_1 = require("./src/notation");
const mode_1 = require("./src/mode/mode");
const configuration_1 = require("./src/configuration/configuration");
const packagejson = require('../package.json'); // out/../package.json
class EditorIdentity {
    constructor(textEditor) {
        this._fileName = textEditor && textEditor.document.fileName || "";
        this._viewColumn = textEditor && textEditor.viewColumn || vscode.ViewColumn.One;
    }
    get fileName() {
        return this._fileName;
    }
    get viewColumn() {
        return this._viewColumn;
    }
    hasSameBuffer(identity) {
        return this.fileName === identity.fileName;
    }
    isEqual(identity) {
        return this.fileName === identity.fileName && this.viewColumn === identity.viewColumn;
    }
    toString() {
        return this.fileName + this.viewColumn;
    }
}
exports.EditorIdentity = EditorIdentity;
let extensionContext;
/**
 * Note: We can't initialize modeHandler here, or even inside activate(), because some people
 * see a bug where VSC hasn't fully initialized yet, which pretty much breaks VSCodeVim entirely.
 */
let modeHandlerToEditorIdentity = {};
let previousActiveEditorId = new EditorIdentity();
function getAndUpdateModeHandler() {
    return __awaiter(this, void 0, void 0, function* () {
        const oldHandler = modeHandlerToEditorIdentity[previousActiveEditorId.toString()];
        const activeEditorId = new EditorIdentity(vscode.window.activeTextEditor);
        const oldModeHandler = modeHandlerToEditorIdentity[activeEditorId.toString()];
        if (!oldModeHandler ||
            oldModeHandler.vimState.editor !== vscode.window.activeTextEditor) {
            const newModeHandler = new modeHandler_1.ModeHandler();
            modeHandlerToEditorIdentity[activeEditorId.toString()] = newModeHandler;
            extensionContext.subscriptions.push(newModeHandler);
            if (oldModeHandler) {
                oldModeHandler.dispose();
            }
        }
        const handler = modeHandlerToEditorIdentity[activeEditorId.toString()];
        handler.vimState.editor = vscode.window.activeTextEditor;
        if (previousActiveEditorId.hasSameBuffer(activeEditorId)) {
            if (!previousActiveEditorId.isEqual(activeEditorId)) {
                // We have opened two editors, working on the same file.
                previousActiveEditorId = activeEditorId;
            }
        }
        else {
            previousActiveEditorId = activeEditorId;
            yield handler.updateView(handler.vimState, { drawSelection: false, revealRange: false });
        }
        if (oldHandler && oldHandler.vimState.focusChanged) {
            oldHandler.vimState.focusChanged = false;
            handler.vimState.focusChanged = true;
        }
        vscode.commands.executeCommand('setContext', 'vim.mode', handler.vimState.currentModeName());
        // Temporary workaround for vscode bug not changing cursor style properly
        // https://github.com/Microsoft/vscode/issues/17472
        // https://github.com/Microsoft/vscode/issues/17513
        const options = handler.vimState.editor.options;
        const desiredStyle = options.cursorStyle;
        // Temporarily change to any other cursor style besides the desired type, then change back
        if (desiredStyle === vscode.TextEditorCursorStyle.Block) {
            handler.vimState.editor.options.cursorStyle = vscode.TextEditorCursorStyle.Line;
            handler.vimState.editor.options.cursorStyle = desiredStyle;
        }
        else {
            handler.vimState.editor.options.cursorStyle = vscode.TextEditorCursorStyle.Block;
            handler.vimState.editor.options.cursorStyle = desiredStyle;
        }
        return handler;
    });
}
exports.getAndUpdateModeHandler = getAndUpdateModeHandler;
class CompositionState {
    constructor() {
        this.isInComposition = false;
        this.composingText = "";
    }
}
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        extensionContext = context;
        let compositionState = new CompositionState();
        // Event to update active configuration items when changed without restarting vscode
        vscode.workspace.onDidChangeConfiguration((e) => {
            configuration_1.Configuration.updateConfiguration();
            // Update the remappers foreach modehandler
            for (let mh in modeHandlerToEditorIdentity) {
                modeHandlerToEditorIdentity[mh].createRemappers();
            }
        });
        vscode.window.onDidChangeActiveTextEditor(handleActiveEditorChange, this);
        vscode.workspace.onDidChangeTextDocument((event) => {
            /**
             * Change from vscode editor should set document.isDirty to true but they initially don't!
             * There is a timing issue in vscode codebase between when the isDirty flag is set and
             * when registered callbacks are fired. https://github.com/Microsoft/vscode/issues/11339
             */
            let contentChangeHandler = (modeHandler) => {
                if (modeHandler.vimState.currentMode === mode_1.ModeName.Insert) {
                    if (modeHandler.vimState.historyTracker.currentContentChanges === undefined) {
                        modeHandler.vimState.historyTracker.currentContentChanges = [];
                    }
                    modeHandler.vimState.historyTracker.currentContentChanges =
                        modeHandler.vimState.historyTracker.currentContentChanges.concat(event.contentChanges);
                }
            };
            if (globals_1.Globals.isTesting) {
                contentChangeHandler(globals_1.Globals.modeHandlerForTesting);
            }
            else {
                _.filter(modeHandlerToEditorIdentity, modeHandler => modeHandler.identity.fileName === event.document.fileName)
                    .forEach(modeHandler => {
                    contentChangeHandler(modeHandler);
                });
            }
            setTimeout(() => {
                if (!event.document.isDirty && !event.document.isUntitled) {
                    handleContentChangedFromDisk(event.document);
                }
            }, 0);
        });
        registerCommand(context, 'type', (args) => __awaiter(this, void 0, void 0, function* () {
            taskQueue_1.taskQueue.enqueueTask({
                promise: () => __awaiter(this, void 0, void 0, function* () {
                    const mh = yield getAndUpdateModeHandler();
                    if (compositionState.isInComposition) {
                        compositionState.composingText += args.text;
                    }
                    else {
                        yield mh.handleKeyEvent(args.text);
                    }
                }),
                isRunning: false
            });
        }));
        registerCommand(context, 'replacePreviousChar', (args) => __awaiter(this, void 0, void 0, function* () {
            taskQueue_1.taskQueue.enqueueTask({
                promise: () => __awaiter(this, void 0, void 0, function* () {
                    const mh = yield getAndUpdateModeHandler();
                    if (compositionState.isInComposition) {
                        compositionState.composingText = compositionState.composingText.substr(0, compositionState.composingText.length - args.replaceCharCnt) + args.text;
                    }
                    else {
                        yield vscode.commands.executeCommand('default:replacePreviousChar', {
                            text: args.text,
                            replaceCharCnt: args.replaceCharCnt
                        });
                        mh.vimState.cursorPosition = position_1.Position.FromVSCodePosition(mh.vimState.editor.selection.start);
                        mh.vimState.cursorStartPosition = position_1.Position.FromVSCodePosition(mh.vimState.editor.selection.start);
                    }
                }),
                isRunning: false
            });
        }));
        registerCommand(context, 'compositionStart', (args) => __awaiter(this, void 0, void 0, function* () {
            taskQueue_1.taskQueue.enqueueTask({
                promise: () => __awaiter(this, void 0, void 0, function* () {
                    const mh = yield getAndUpdateModeHandler();
                    compositionState.isInComposition = true;
                }),
                isRunning: false
            });
        }));
        registerCommand(context, 'compositionEnd', (args) => __awaiter(this, void 0, void 0, function* () {
            taskQueue_1.taskQueue.enqueueTask({
                promise: () => __awaiter(this, void 0, void 0, function* () {
                    const mh = yield getAndUpdateModeHandler();
                    let text = compositionState.composingText;
                    compositionState = new CompositionState();
                    yield mh.handleMultipleKeyEvents(text.split(""));
                }),
                isRunning: false
            });
        }));
        registerCommand(context, 'extension.showCmdLine', () => {
            main_1.showCmdLine("", modeHandlerToEditorIdentity[new EditorIdentity(vscode.window.activeTextEditor).toString()]);
        });
        // Clear boundKeyCombinations array incase there are any entries in it so
        // that we have a clean list of keys with no duplicates
        configuration_1.Configuration.boundKeyCombinations = [];
        for (let keybinding of packagejson.contributes.keybindings) {
            let keyToBeBound = "";
            /**
             * On OSX, handle mac keybindings if we specified one.
             */
            if (process.platform === "darwin") {
                keyToBeBound = keybinding.mac || keybinding.key;
            }
            else if (process.platform === "linux") {
                keyToBeBound = keybinding.linux || keybinding.key;
            }
            else {
                keyToBeBound = keybinding.key;
            }
            const bracketedKey = notation_1.AngleBracketNotation.Normalize(keyToBeBound);
            // Store registered key bindings in bracket notation form
            configuration_1.Configuration.boundKeyCombinations.push(bracketedKey);
            registerCommand(context, keybinding.command, () => handleKeyEvent(`${bracketedKey}`));
        }
        // Update configuration now that bound keys array is populated
        configuration_1.Configuration.updateConfiguration();
        // Initialize mode handler for current active Text Editor at startup.
        if (vscode.window.activeTextEditor) {
            let mh = yield getAndUpdateModeHandler();
            mh.updateView(mh.vimState, { drawSelection: false, revealRange: false });
        }
    });
}
exports.activate = activate;
function registerCommand(context, command, callback) {
    let disposable = vscode.commands.registerCommand(command, (args) => __awaiter(this, void 0, void 0, function* () {
        if (!vscode.window.activeTextEditor) {
            return;
        }
        if (vscode.window.activeTextEditor.document && vscode.window.activeTextEditor.document.uri.toString() === "debug:input") {
            yield vscode.commands.executeCommand("default:" + command, args);
            return;
        }
        callback(args);
    }));
    context.subscriptions.push(disposable);
}
function handleKeyEvent(key) {
    return __awaiter(this, void 0, void 0, function* () {
        const mh = yield getAndUpdateModeHandler();
        taskQueue_1.taskQueue.enqueueTask({
            promise: () => __awaiter(this, void 0, void 0, function* () {
                yield mh.handleKeyEvent(key);
            }),
            isRunning: false
        });
    });
}
function handleContentChangedFromDisk(document) {
    _.filter(modeHandlerToEditorIdentity, modeHandler => modeHandler.identity.fileName === document.fileName)
        .forEach(modeHandler => {
        modeHandler.vimState.historyTracker.clear();
    });
}
function handleActiveEditorChange() {
    return __awaiter(this, void 0, void 0, function* () {
        // Don't run this event handler during testing
        if (globals_1.Globals.isTesting) {
            return;
        }
        taskQueue_1.taskQueue.enqueueTask({
            promise: () => __awaiter(this, void 0, void 0, function* () {
                if (vscode.window.activeTextEditor !== undefined) {
                    const mh = yield getAndUpdateModeHandler();
                    mh.updateView(mh.vimState, { drawSelection: false, revealRange: false });
                }
            }),
            isRunning: false
        });
    });
}
process.on('unhandledRejection', function (reason, p) {
    console.log("Unhandled Rejection at: Promise ", p, " reason: ", reason);
});
//# sourceMappingURL=extension.js.map