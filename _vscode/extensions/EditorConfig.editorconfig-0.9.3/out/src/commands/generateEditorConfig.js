Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const vscode_1 = require("vscode");
const Utils = require("../Utils");
const propsToGenerate = [
    'indent_style',
    'indent_size',
    'tab_width'
];
/**
 * Generate a .editorconfig file in the root of the workspace based on the
 * current vscode settings.
 */
function generateEditorConfig() {
    if (!vscode_1.workspace.rootPath) {
        vscode_1.window.showInformationMessage('Please open a folder before generating an .editorconfig file');
        return;
    }
    const editorConfigFile = path.join(vscode_1.workspace.rootPath, '.editorconfig');
    fs.stat(editorConfigFile, (err, stats) => {
        if (err) {
            if (err.code === 'ENOENT') {
                writeFile();
            }
            else {
                vscode_1.window.showErrorMessage(err.message);
            }
            return;
        }
        if (stats.isFile()) {
            vscode_1.window.showErrorMessage('A .editorconfig file already exists in your workspace.');
        }
    });
    function writeFile() {
        const contents = ['root = true', '', '[*]'];
        const editorConfigurationNode = vscode_1.workspace.getConfiguration('editor');
        const settings = Utils.toEditorConfig({
            insertSpaces: editorConfigurationNode
                .get('insertSpaces'),
            tabSize: editorConfigurationNode
                .get('tabSize')
        });
        for (const setting of propsToGenerate) {
            if (settings.hasOwnProperty(setting)) {
                contents.push(`${setting} = ${settings[setting]}`);
            }
        }
        fs.writeFile(editorConfigFile, contents.join('\n'), err => {
            if (err) {
                vscode_1.window.showErrorMessage(err.message);
                return;
            }
        });
    }
}
exports.generateEditorConfig = generateEditorConfig;
//# sourceMappingURL=generateEditorConfig.js.map