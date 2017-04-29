Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const PreSaveTransformation_1 = require("./PreSaveTransformation");
class SetEndOfLine extends PreSaveTransformation_1.default {
    constructor() {
        super(...arguments);
        this.eolMap = {
            LF: vscode_1.EndOfLine.LF,
            CRLF: vscode_1.EndOfLine.CRLF
        };
    }
    transform(editorconfig) {
        const eolKey = (editorconfig.end_of_line || '').toUpperCase();
        const eol = this.eolMap[eolKey];
        return (eol) ? {
            edits: [vscode_1.TextEdit.setEndOfLine(eol)],
            message: `setEndOfLine(${eolKey})`
        } : { edits: [] };
    }
}
exports.default = SetEndOfLine;
//# sourceMappingURL=SetEndOfLine.js.map