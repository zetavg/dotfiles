import sublime
import sublime_plugin

class CollapseAllSubFoldersOnSidebarCommand(sublime_plugin.WindowCommand):
    def run(self):
        self.refresh_folders()

    def refresh_folders(self):
        data = self.get_project_json()
        self.set_project_json({})
        self.set_project_json(data)

    def get_project_json(self):
        return self.window.project_data()

    def set_project_json(self, data):
        return self.window.set_project_data(data)

class ForceRevealInSidebarCommand(sublime_plugin.WindowCommand):
    def run(self):
        self.window.run_command('collapse_all_sub_folders_on_sidebar')
        sublime.set_timeout(lambda: self.window.run_command('reveal_in_side_bar'), 10)
        sublime.set_timeout(lambda: self.window.run_command('reveal_in_side_bar'), 50)
        sublime.set_timeout(lambda: self.window.run_command('reveal_in_side_bar'), 100)
        sublime.set_timeout(lambda: self.window.run_command('reveal_in_side_bar'), 1000)
        sublime.set_timeout(lambda: self.window.run_command('reveal_in_side_bar'), 1500)
        sublime.set_timeout(lambda: self.window.run_command('reveal_in_side_bar'), 2000)
        sublime.set_timeout(lambda: self.window.run_command('reveal_in_side_bar'), 2500)
        sublime.set_timeout(lambda: self.window.run_command('reveal_in_side_bar'), 3000)
        sublime.set_timeout(lambda: self.window.run_command('focus_side_bar'), 50)
