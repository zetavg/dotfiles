'use strict';
var vscode = require('vscode');
var pasteAndIndent = function () {
    var config = vscode.workspace.getConfiguration('pasteAndIndent');
    var editor = vscode.window.activeTextEditor;
    var start = editor.selection.start;
    var offset = start.character;
    var indentChar = editor.options.insertSpaces ? ' ' : '\t';
    var startLine = editor.document.getText(new vscode.Selection(start.line, 0, start.line, start.character));
    var startChar = startLine.search(/\S/);
    if (startChar > -1) {
        offset = startChar;
    }
    vscode.commands.executeCommand('editor.action.clipboardPasteAction').then(function () {
        var end = editor.selection.end;
        var selectionToIndent = new vscode.Selection(start.line, start.character, end.line, end.character);
        var selectedText = editor.document.getText(selectionToIndent);
        var leadingSpaces = []; // The amount of leading space the line has
        var xmin; // The minimum amount of leading space amongst the non-empty lines
        var linesToIndent = selectedText.split('\n');
        if (linesToIndent.length <= 1) {
            return; // Skip indentation
        }
        // Find out what is the minimum leading space of the non empty lines (xmin)
        linesToIndent.forEach(function (line, index) {
            var _xmin = line.search(/\S/); // -1 means the line is blank (full of space characters)
            var numberOfTabs;
            if (_xmin !== -1) {
                // Normalize the line according to the indentation preferences
                if (editor.options.insertSpaces) {
                    numberOfTabs = line.substring(0, _xmin).split(/\t/).length - 1;
                    _xmin += numberOfTabs * (Number(editor.options.tabSize) - 1);
                }
                else {
                    // Reduce _xmin by how many space characters are in the line
                    _xmin -= (line.substring(0, _xmin).match(/[^\t]+/g) || []).length;
                }
                if (index > 0 && (typeof xmin === 'undefined' || xmin > _xmin)) {
                    xmin = _xmin;
                }
            }
            leadingSpaces[index] = _xmin;
        });
        if (xmin === 0 && offset === 0) {
            return; // Skip indentation
        }
        linesToIndent = linesToIndent.map(function (line, index) {
            var x = leadingSpaces[index];
            var chars = (index === 0 || x === -1) ? '' : indentChar.repeat(x - xmin + offset);
            return line.replace(/^\s*/, chars);
        });
        editor.edit(function (editBuilder) {
            editBuilder.replace(selectionToIndent, linesToIndent.join('\n'));
            if (linesToIndent.length > 1 && config.get('selectAfter', false)) {
                editor.selection = new vscode.Selection(start.line + 1, 0, end.line, linesToIndent[linesToIndent.length - 1].length);
            }
        });
    });
};
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('pasteAndIndent.action', pasteAndIndent));
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map