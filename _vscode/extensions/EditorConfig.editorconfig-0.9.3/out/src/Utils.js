Object.defineProperty(exports, "__esModule", { value: true });
const get = require("lodash.get");
const vscode_1 = require("vscode");
/**
 * Convert .editorconfig values to vscode editor options
 */
function fromEditorConfig(config, defaults) {
    const resolved = {
        tabSize: (config.indent_style === 'tab'
            ? get(config, 'tab_width', config.indent_size)
            : get(config, 'indent_size', config.tab_width))
    };
    if (get(resolved, 'tabSize') === 'tab') {
        resolved.tabSize = config.tab_width;
    }
    return {
        insertSpaces: config.indent_style
            ? config.indent_style !== 'tab'
            : defaults.insertSpaces,
        tabSize: get(resolved, 'tabSize', defaults.tabSize)
    };
}
exports.fromEditorConfig = fromEditorConfig;
/**
 * Convert vscode editor options to .editorconfig values
 */
function toEditorConfig(options) {
    const result = {};
    switch (options.insertSpaces) {
        case true:
            result.indent_style = 'space';
            result.indent_size = resolveTabSize(options.tabSize);
            break;
        case false:
        case 'auto':
            result.indent_style = 'tab';
            result.tab_width = resolveTabSize(options.tabSize);
            break;
    }
    return result;
}
exports.toEditorConfig = toEditorConfig;
/**
 * Convert vscode tabSize option into numeric value
 */
function resolveTabSize(tabSize) {
    return (tabSize === 'auto') ? 4 : parseInt(String(tabSize), 10);
}
exports.resolveTabSize = resolveTabSize;
/**
 * Retrieve the current active text editor.
 */
function findEditor(doc) {
    for (const editor of vscode_1.window.visibleTextEditors) {
        if (editor.document === doc) {
            return editor;
        }
    }
    return null;
}
exports.findEditor = findEditor;
//# sourceMappingURL=Utils.js.map