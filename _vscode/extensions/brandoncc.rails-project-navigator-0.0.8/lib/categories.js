const { window, workspace, Uri } = require('vscode');
const path = require('path');

function Categories() {
  this._categories = {};

  this._get = function(name) {
    return this._categories[name];
  }
}

Categories.prototype.add = function(name, relativePath, exclusionGlob) {
  // Don't add a category twice
  if (this._get(name)) { return; }

  this._categories[name] = { name, relativePath, exclusionGlob };
};

Categories.prototype.showFilesFor = function(name) {
  let category = this._get(name);
  let searchPath = `${category.relativePath}/**/*.*`;
  let exclusions = category.exclusionGlob ? `${category.exclusionGlob}` : undefined;

  workspace.findFiles(searchPath, exclusions).then((files) => {
    let filesToList = files.map((file) => {
      let path = workspace.asRelativePath(file._fsPath);
      return path.replace(new RegExp(`^${category.relativePath}/`), '');
    });

    window.showQuickPick(filesToList, {placeholder: 'Select a File'}).then((selected) => {
      if(!selected) return;
        const fullPath = Uri.parse('file://' + path.join(workspace.rootPath, category.relativePath, selected));
        workspace.openTextDocument(fullPath).then(doc => {
            return window.showTextDocument(doc);
        });
    });
  });
};

Categories.prototype.names = function() {
  return Object.keys(this._categories).sort((a, b) => {
    if (a.toLowerCase() > b.toLowerCase()) { return 1; }
    if (a.toLowerCase() < b.toLowerCase()) { return -1; }

    return 0;
  });
};

module.exports = Categories;
