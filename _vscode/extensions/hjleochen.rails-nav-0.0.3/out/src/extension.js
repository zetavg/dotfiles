'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var path_1 = require('path');
var rails_helper_1 = require('./rails_helper');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "rails" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    var disposable = vscode.commands.registerCommand('extension.rails-nav', function () {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        //vscode.window.showInformationMessage('Hello World!');
        if (!vscode.window.activeTextEditor) {
            return;
        }
        var relativeFileName = vscode.workspace.asRelativePath(vscode.window.activeTextEditor.document.fileName);
        var fileName = path_1.basename(relativeFileName);
        var filePath = path_1.dirname(relativeFileName);
        var rh = new rails_helper_1.RailsHelper(filePath, fileName);
        rh.showFileList();
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map