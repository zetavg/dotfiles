Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const EditorConfigCompletionProvider_1 = require("./EditorConfigCompletionProvider");
const DocumentWatcher_1 = require("./DocumentWatcher");
const generateEditorConfig_1 = require("./commands/generateEditorConfig");
/**
 * Main entry
 */
function activate(ctx) {
    ctx.subscriptions.push(new DocumentWatcher_1.default());
    // register .editorconfig file completion provider
    const editorConfigFileSelector = {
        language: 'properties',
        pattern: '**/.editorconfig'
    };
    vscode_1.languages.registerCompletionItemProvider(editorConfigFileSelector, new EditorConfigCompletionProvider_1.default());
    // register an internal command used to automatically display IntelliSense
    // when editing a .editorconfig file
    vscode_1.commands.registerCommand('editorconfig._triggerSuggestAfterDelay', () => {
        setTimeout(function () {
            vscode_1.commands.executeCommand('editor.action.triggerSuggest');
        }, 100);
    });
    // register a command handler to generate a .editorconfig file
    vscode_1.commands.registerCommand('vscode.generateeditorconfig', generateEditorConfig_1.generateEditorConfig);
}
exports.activate = activate;
//# sourceMappingURL=editorConfigMain.js.map