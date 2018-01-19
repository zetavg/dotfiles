import sublime
import sublime_plugin

import subprocess
import json

class MapSelectionsWithJsFuncCommand(sublime_plugin.TextCommand):
    default_func = '(v, i) => v'
    last_func = '(v, i) => v'

    def run(self, edit, redo=False):
        def on_js_func(func):
            type(self).last_func = func
            self.view.run_command('map_selections_with_given_js_func', { "func": func } )

        panel = self.view.window().show_input_panel(
            'Edit JavaScript Function:' if redo else 'JavaScript Function:', type(self).last_func if redo else type(self).default_func,
            on_js_func, None, None
        )
        panel.settings().set('map_selections_with_js_func_panel', True)

class MapSelectionsWithGivenJsFuncCommand(sublime_plugin.TextCommand):
    def run(self, edit, func):
        texts = map(self.text_from_selection, self.view.sel())
        inputs = json.dumps(list(texts))
        try:
            outputs_json = subprocess.check_output(['node', '-e', 'try { var inputs = ' + inputs + '; var func = (() => { return ' + func + ' })(); var outputs = inputs.map(func); console.log(JSON.stringify(outputs)); } catch (e) { console.log(e.message) }'], timeout=8)
            outputs = json.loads(outputs_json.decode('utf-8'))

            for i, s in enumerate(self.view.sel()):
                self.view.replace(edit, s, str(outputs[i]))

        except subprocess.CalledProcessError:
            sublime.error_message('Error executing JavaScript\nGiven Function: ' + func)

        except subprocess.TimeoutExpired:
            sublime.error_message('JavaScript Execution Timeout\nGiven Function: ' + func)

        except ValueError:
            sublime.error_message('JavaScript Error: ' + outputs_json.decode('utf-8') + '\nGiven Function: ' + func)

    def text_from_selection(self, s):
        if s.empty():
            s = self.view.word(s)
        text = self.view.substr(s)
        return text
