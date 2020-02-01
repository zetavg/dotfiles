import sublime_plugin

# A goto-definition command that checks if the mouse event is really a "click",
# not a "select".
#
# Sample usage in Default (OSX).sublime-mousemap:
#
#   [
#     // Alt + Mouse 1 Column select, which also supports goto defn
#     {
#       "button": "button1",
#       "modifiers": ["alt"],
#       "press_command": "drag_select",
#       "press_args": {"by": "columns"},
#       "command": "goto_defn",
#       "args": { "command": "lsp_symbol_definition" }
#     }
#   ]
#
class GotoDefnCommand(sublime_plugin.TextCommand):
    def run(self, edit, command='lsp_symbol_definition'):
        sel = self.view.sel()
        if len(sel) > 1:
            return

        if len(sel) == 1:
            select_region = sel[0]
            if not select_region.empty():
                return

        self.view.run_command(command)
