var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const editorconfig = require("editorconfig");
const compact = require("lodash.compact");
const path = require("path");
const vscode_1 = require("vscode");
const languageExtensionMap_1 = require("./languageExtensionMap");
const Utils_1 = require("./Utils");
const transformations_1 = require("./transformations");
class DocumentWatcher {
    constructor(outputChannel = vscode_1.window.createOutputChannel('EditorConfig')) {
        this.outputChannel = outputChannel;
        this.preSaveTransformations = [
            new transformations_1.SetEndOfLine(),
            new transformations_1.TrimTrailingWhitespace(),
            new transformations_1.InsertFinalNewline()
        ];
        this.log('Initializing document watcher...');
        const subscriptions = [];
        subscriptions.push(vscode_1.window.onDidChangeActiveTextEditor(editor => {
            if (editor && editor.document) {
                this.onDidOpenDocument(editor.document);
            }
        }));
        subscriptions.push(vscode_1.workspace.onDidChangeConfiguration(this.onConfigChanged.bind(this)));
        subscriptions.push(vscode_1.workspace.onDidSaveTextDocument((doc) => __awaiter(this, void 0, void 0, function* () {
            if (path.basename(doc.fileName) === '.editorconfig') {
                this.log('.editorconfig file saved.');
                yield this.rebuildConfigMap();
            }
        })));
        subscriptions.push(vscode_1.workspace.onWillSaveTextDocument((e) => __awaiter(this, void 0, void 0, function* () {
            let selections;
            if (vscode_1.window.activeTextEditor.document === e.document) {
                selections = vscode_1.window.activeTextEditor.selections;
            }
            const transformations = this.calculatePreSaveTransformations(e.document);
            e.waitUntil(transformations);
            if (selections) {
                transformations.then(() => {
                    vscode_1.window.activeTextEditor.selections = selections;
                });
            }
        })));
        this.disposable = vscode_1.Disposable.from.apply(this, subscriptions);
        this.rebuildConfigMap();
        this.onConfigChanged();
    }
    log(...messages) {
        this.outputChannel.appendLine(messages.join(' '));
    }
    dispose() {
        this.disposable.dispose();
    }
    getSettingsForDocument(doc) {
        return this.docToConfigMap[this.getFileName(doc)];
    }
    getFileName(doc) {
        if (!doc.isUntitled) {
            return doc.fileName;
        }
        const ext = languageExtensionMap_1.default[doc.languageId] || doc.languageId;
        return path.join(...compact([
            vscode_1.workspace.rootPath,
            `${doc.fileName}.${ext}`
        ]));
    }
    getDefaultSettings() {
        return this.defaults;
    }
    rebuildConfigMap() {
        return __awaiter(this, void 0, void 0, function* () {
            this.log('Rebuilding config map...');
            this.docToConfigMap = {};
            return yield Promise.all(vscode_1.workspace.textDocuments.map(doc => this.onDidOpenDocument(doc)));
        });
    }
    onDidOpenDocument(doc) {
        return __awaiter(this, void 0, void 0, function* () {
            if (doc.languageId === 'Log') {
                return;
            }
            const fileName = this.getFileName(doc);
            const relativePath = vscode_1.workspace.asRelativePath(fileName);
            if (this.docToConfigMap[fileName]) {
                this.log(`${relativePath}: Applying configuration map...`);
                yield this.applyEditorConfigToTextEditor(vscode_1.window.activeTextEditor);
                return;
            }
            this.log(`${relativePath}: Using EditorConfig core...`);
            return editorconfig.parse(fileName)
                .then((config) => __awaiter(this, void 0, void 0, function* () {
                if (config.indent_size === 'tab') {
                    config.indent_size = config.tab_width;
                }
                this.docToConfigMap[fileName] = config;
                yield this.applyEditorConfigToTextEditor(vscode_1.window.activeTextEditor);
            }));
        });
    }
    applyEditorConfigToTextEditor(editor) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!editor) {
                this.log('No more open editors.');
                return Promise.resolve();
            }
            const doc = editor.document;
            const relativePath = vscode_1.workspace.asRelativePath(doc.fileName);
            const editorconfig = this.getSettingsForDocument(doc);
            if (!editorconfig) {
                this.log(`${relativePath}: No configuration.`);
                return Promise.resolve();
            }
            const newOptions = Utils_1.fromEditorConfig(editorconfig, this.getDefaultSettings());
            // tslint:disable-next-line:no-any
            editor.options = newOptions;
            this.log(`${relativePath}: ${JSON.stringify(newOptions)}`);
        });
    }
    onConfigChanged() {
        const workspaceConfig = vscode_1.workspace.getConfiguration('editor');
        const detectIndentation = workspaceConfig.get('detectIndentation');
        this.defaults = (detectIndentation) ? {} : {
            tabSize: workspaceConfig.get('tabSize'),
            insertSpaces: workspaceConfig.get('insertSpaces')
        };
        this.log('Detected change in configuration:', JSON.stringify(this.defaults));
    }
    calculatePreSaveTransformations(doc) {
        return __awaiter(this, void 0, void 0, function* () {
            const editorconfig = this.getSettingsForDocument(doc);
            const relativePath = vscode_1.workspace.asRelativePath(doc.fileName);
            if (!editorconfig) {
                this.log(`${relativePath}: No configuration found for pre-save.`);
                return [];
            }
            return Array.prototype.concat.call([], ...this.preSaveTransformations.map(transformer => {
                const { edits, message } = transformer.transform(editorconfig, doc);
                if (edits instanceof Error) {
                    this.log(`${relativePath}: ${edits.message}`);
                }
                if (message) {
                    this.log(`${relativePath}: ${message}`);
                }
                return edits;
            }));
        });
    }
}
exports.default = DocumentWatcher;
//# sourceMappingURL=DocumentWatcher.js.map