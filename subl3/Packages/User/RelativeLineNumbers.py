"""
File: RelativeLineNumbers.py
Author: Francesc Arpí @ 2017
Github: https://github.com/francescarpi/RelativeLineNumbers
"""

import sublime
import sublime_plugin

PACKAGE = "RelativeLineNumbers"
OPT_ENABLED = "relative_line_numbers_enabled"
OPT_COLOR = "relative_line_numbers_color"
OPT_COLOR_CURRENT = "relative_line_numbers_current_line_color"
OPT_CURRENT_CHAR = "relative_line_numbers_current_line_char"
OPT_CLEAR_TIMEOUT = "relative_line_numbers_clear_timeout"


class RelativeLineNumbersCommand(sublime_plugin.TextCommand):

    def __init__(self, *args, **kwargs):
        super(RelativeLineNumbersCommand, self).__init__(*args, **kwargs)
        self._visible = False
        self._phantoms = sublime.PhantomSet(self.view, PACKAGE)

    def run(self, *args, **kwargs):
        if not self._visible:
            self._render()
            self._visible = True
        else:
            self._clear()
            self._visible = False

    def _tpl(self, value, current):
        settings = self.view.settings()
        color = settings.get(OPT_COLOR, "gray")
        current_color = settings.get(OPT_COLOR_CURRENT, "white")
        current_class = "current" if current else ""

        return """
            <body id="{pkg}">
                <style>
                    .value {{
                        color: {color};
                        margin-right: 10px;
                    }}
                    .current {{
                        color: {current_color};
                    }}
                </style>
                <div class="value {current_class}">{value}</div>
            </body>
        """.format(**dict(
            pkg=PACKAGE, color=color, current_color=current_color, value=value,
            current_class=current_class))

    def _value(self, line_number, current_line, current_line_char):
        value = current_line_char
        if line_number < current_line:
            value = str(current_line - line_number)
        elif line_number > current_line:
            value = str(line_number - current_line)

        if len(value) == 1:
            value = "&nbsp;" + value

        return value

    def _clear(self):
        self._visible = False
        self._phantoms.update([])

    def _render(self):

        settings = self.view.settings()
        enabled = settings.get(OPT_ENABLED, True)

        self._clear()
        if not enabled:
            return

        phantoms = []
        current_line = self.view.rowcol(self.view.sel()[0].begin())[0]
        current_line_char = settings.get(OPT_CURRENT_CHAR, "0")
        lines = self.view.lines(self.view.visible_region())

        for line in lines:
            line_number = self.view.rowcol(line.a)[0]
            value = self._value(
                line_number, current_line, current_line_char)

            phantoms.append(
                sublime.Phantom(
                    line, self._tpl(value, line_number == current_line),
                    sublime.LAYOUT_INLINE))

        self._phantoms.update(phantoms)
        self.view.set_viewport_position(
            (0, self.view.viewport_position()[1]), False)
        sublime.set_timeout(self._clear, settings.get(OPT_CLEAR_TIMEOUT, 1000))
