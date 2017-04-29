var vscode = require('vscode');
var path = require('path');
var fs = require('fs');

function activate(context) {
  var isWin = /^win/.test(process.platform);
  var appDir = path.dirname(require.main.filename);

  var base = appDir + (isWin ? '\\vs\\workbench' : '/vs/workbench');

  var htmlFile = base + (isWin ? '\\electron-browser\\bootstrap\\index.html' : '/electron-browser/bootstrap/index.html');
  var htmlFileBack = base + (isWin ? '\\electron-browser\\bootstrap\\index.html.bak-customcss' : '/electron-browser/bootstrap/index.bak-customcss');

  function replaceCss() {
    var injectHTML = '<script src="' + module.filename.replace(/extension\.js$/, 'script.js') + '"></script>';
    injectHTML += '<link rel="stylesheet" href="file://' + module.filename.replace(/extension\.js$/, 'style.css') + '">';
    try {
      var html = fs.readFileSync(htmlFile, 'utf-8');
      html = html.replace(/<!-- !! SPACEGREY-CUSTOM-CSS-START !! -->[\s\S]*?<!-- !! SPACEGREY-CUSTOM-CSS-END !! -->/, '');
      html = html.replace(/(<\/html>)/,
        '<!-- !! SPACEGREY-CUSTOM-CSS-START !! -->' + injectHTML + '<!-- !! SPACEGREY-CUSTOM-CSS-END !! --></html>');
      fs.writeFileSync(htmlFile, html, 'utf-8');
      enabledRestart();
    } catch (e) {
      console.log(e);
    }
  }

  function timeDiff(d1, d2) {
    var timeDiff = Math.abs(d2.getTime() - d1.getTime());
    return timeDiff;
  }

  function hasBeenUpdated(stats1, stats2) {
    var dbak = new Date(stats1.ctime);
    var dor = new Date(stats2.ctime);
    var segs = timeDiff(dbak, dor) / 1000;
    return segs > 60;
  }

  function cleanCssInstall() {
    var c = fs.createReadStream(htmlFile).pipe(fs.createWriteStream(htmlFileBack));
    c.on('finish', function () {
      replaceCss();
    });
  }

  function installItem(bakfile, orfile, cleanInstallFunc) {
    fs.stat(bakfile, function (errBak, statsBak) {
      if (errBak) {
        // clean installation
        cleanInstallFunc();
      } else {
        // check htmlFileBack's timestamp and compare it to the htmlFile's.
        fs.stat(orfile, function (errOr, statsOr) {
          if (errOr) {
            vscode.window.showInformationMessage(msg.smthingwrong + errOr);
          } else {
            var updated = hasBeenUpdated(statsBak, statsOr);
            if (updated) {
              // some update has occurred. clean install
              cleanInstallFunc();
            }
          }
        });
      }
    });
  }

  function reloadWindow() {
    // reload vscode-window
    vscode.commands.executeCommand("workbench.action.reloadWindow");
  }

  function enabledRestart() {
    vscode.window.showInformationMessage("Please reload VSCode to let custom CSS be loaded", { title: "Reload" })
      .then(function (msg) {
        reloadWindow();
      });
  }

  installItem(htmlFileBack, htmlFile, cleanCssInstall);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;
