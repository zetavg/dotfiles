const { commands, window } = require('vscode');
const Categories = require('./lib/categories');

function activate(context) {
  const categories = new Categories();

  categories.add('Config', 'config', 'config/initializers/**/*.*');
  categories.add('Controllers', 'app/controllers');
  categories.add('Helpers', 'app/helpers');
  categories.add('Initializers', 'config/initializers');
  categories.add('Jobs', 'app/jobs');
  categories.add('Layouts', 'app/views/layouts');
  categories.add('Mailers', 'app/mailers');
  categories.add('Migrations', 'db/migrate');
  categories.add('Models', 'app/models');
  categories.add('Specs', 'spec');
  categories.add('Tests', 'test');
  categories.add('Views', 'app/views', 'app/views/layouts/**/*.*');

  var disposable = commands.registerCommand('railsProjectNavigator.navigate', function () {
    window.showQuickPick(categories.names(), {placeholder: 'Select a Category'}).then((selected) => {
      if (!selected) { return; }

      categories.showFilesFor(selected);
    });
  });

  context.subscriptions.push(disposable);
}
exports.activate = activate;
