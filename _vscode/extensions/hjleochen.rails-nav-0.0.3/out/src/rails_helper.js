'use strict';
var vscode = require('vscode');
var path_1 = require('path');
//import * as inf from 'inflection';
var inflection = require('inflection');
var FileType;
(function (FileType) {
    FileType[FileType["Controller"] = 1] = "Controller";
    FileType[FileType["Model"] = 2] = "Model";
    FileType[FileType["Layout"] = 3] = "Layout";
    FileType[FileType["View"] = 4] = "View";
    FileType[FileType["Helper"] = 5] = "Helper";
    FileType[FileType["Javascript"] = 6] = "Javascript";
    FileType[FileType["StyleSheet"] = 7] = "StyleSheet";
    FileType[FileType["Rspec"] = 8] = "Rspec";
    FileType[FileType["Test"] = 9] = "Test";
})(FileType || (FileType = {}));
var RailsHelper = (function () {
    function RailsHelper(file_path, file_name) {
        /*
            private paths = [
                "app/controllers",
                "app/models",
                "app/views",
                "app/views/layouts",
                "app/helpers",
                "app/assets/javascripts",
                "app/assets/stylesheets",
            ];
        */
        this.patterns = [
            "app/controllers/PTN*",
            "app/models/SINGULARIZE*",
            "app/views/PTN/**",
            "app/views/layouts/PTN*",
            "app/helpers/PTN*",
            "app/assets/javascripts/PTN*",
            "app/assets/javascripts/PTN/**",
            "app/assets/stylesheets/PTN*",
            "app/assets/stylesheets/PTN/**",
        ];
        this.items = [];
        this.fileName = file_name;
        this.filePath = path_1.join(file_path, "/");
        this.dectFileType();
    }
    RailsHelper.prototype.searchPaths = function () {
        var _this = this;
        var res = [];
        this.patterns.forEach(function (e) {
            var p = e.replace("PTN", _this.filePatten.toString());
            p = p.replace("SINGULARIZE", inflection.singularize(_this.filePatten.toString()));
            res.push(p);
        });
        return res;
    };
    RailsHelper.prototype.dectFileType = function () {
        this.filePatten = null;
        if (this.filePath.indexOf("app/controllers/") >= 0) {
            this.fileType = FileType.Controller;
            this.filePatten = this.fileName.replace(/_controller\.rb$/, "");
        }
        else if (this.filePath.indexOf("app/models/") >= 0) {
            this.fileType = FileType.Model;
            this.filePatten = this.fileName.replace(/\.rb$/, "");
            //DONE pluralize
            this.filePatten = inflection.pluralize(this.filePatten.toString());
        }
        else if (this.filePath.indexOf("app/views/layouts/") >= 0) {
            this.fileType = FileType.Layout;
            this.filePatten = this.fileName.replace(/\..*?\..*?$/, "");
        }
        else if (this.filePath.indexOf("app/views/") >= 0) {
            this.fileType = FileType.View;
            this.filePatten = this.filePath.replace("app/views/", '').replace(/\/$/, '');
        }
        else if (this.filePath.indexOf("app/helpers/") >= 0) {
            this.fileType = FileType.Helper;
            this.filePatten = this.fileName.replace(/_helper\.rb$/, "");
        }
        else if (this.filePath.indexOf("app/assets/javascripts/") >= 0) {
            this.fileType = FileType.Javascript;
            this.filePatten = this.fileName.replace(/\.js$/, "").replace(/\..*?\..*?$/, "");
        }
        else if (this.filePath.indexOf("app/assets/stylesheets/") >= 0) {
            this.fileType = FileType.StyleSheet;
            this.filePatten = this.fileName.replace(/\.css$/, "").replace(/\..*?\..*?$/, "");
        }
        else if (this.filePath.indexOf("/spec/") >= 0) {
            this.fileType = FileType.Rspec;
            //TODO
            this.filePatten = null;
        }
        else if (this.filePath.indexOf("/test/") >= 0) {
            this.fileType = FileType.Test;
            //TODO
            this.filePatten = null;
        }
    };
    RailsHelper.prototype.generateList = function (arr) {
        var _this = this;
        var cur = arr.pop();
        var _self = this;
        vscode.workspace.findFiles(cur.toString(), null).then(function (res) {
            res.forEach(function (i) {
                var fn = vscode.workspace.asRelativePath(i);
                //var pic = { label: fn, detail: "c: ${fn}" };
                _self.items.push(fn);
            });
            if (arr.length > 0) {
                _self.generateList(arr);
            }
            else {
                //TODO exclude current document
                _this.showQuickPick(_self.items);
            }
        });
    };
    RailsHelper.prototype.showQuickPick = function (items) {
        var p = vscode.window.showQuickPick(items, { placeHolder: "Select File", matchOnDetail: true });
        p.then(function (value) {
            if (!value)
                return;
            var fn = vscode.Uri.parse('file://' + path_1.join(vscode.workspace.rootPath, value));
            vscode.workspace.openTextDocument(fn).then(function (doc) {
                return vscode.window.showTextDocument(doc);
            });
        });
    };
    RailsHelper.prototype.showFileList = function () {
        if (this.filePatten != null) {
            var paths = this.searchPaths().slice();
            this.generateList(paths);
        }
    };
    return RailsHelper;
}());
exports.RailsHelper = RailsHelper;
//# sourceMappingURL=rails_helper.js.map