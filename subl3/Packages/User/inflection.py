import sublime
import sublime_plugin

from .lib.inflection import camelize
from .lib.inflection import dasherize
from .lib.inflection import humanize
from .lib.inflection import ordinal
from .lib.inflection import ordinalize
from .lib.inflection import parameterize
from .lib.inflection import pluralize
from .lib.inflection import singularize
from .lib.inflection import tableize
from .lib.inflection import titleize
from .lib.inflection import transliterate
from .lib.inflection import underscore

class CamelizeTextCommand(sublime_plugin.TextCommand):
    def run(self, edit, uppercase_first_letter=True):
        for s in self.view.sel():
            if s.empty():
                s = self.view.word(s)
            text = self.view.substr(s)
            self.view.replace(edit, s, camelize(text, uppercase_first_letter=uppercase_first_letter))

class DasherizeTextCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        for s in self.view.sel():
            if s.empty():
                s = self.view.word(s)
            text = self.view.substr(s)
            self.view.replace(edit, s, dasherize(text))

class HumanizeTextCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        for s in self.view.sel():
            if s.empty():
                s = self.view.word(s)
            text = self.view.substr(s)
            self.view.replace(edit, s, humanize(text))

class OrdinalTextCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        for s in self.view.sel():
            if s.empty():
                s = self.view.word(s)
            text = self.view.substr(s)
            self.view.replace(edit, s, ordinal(text))

class OrdinalizeTextCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        for s in self.view.sel():
            if s.empty():
                s = self.view.word(s)
            text = self.view.substr(s)
            self.view.replace(edit, s, ordinalize(text))

class ParameterizeTextCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        for s in self.view.sel():
            if s.empty():
                s = self.view.word(s)
            text = self.view.substr(s)
            self.view.replace(edit, s, parameterize(text))

class PluralizeTextCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        for s in self.view.sel():
            if s.empty():
                s = self.view.word(s)
            text = self.view.substr(s)
            self.view.replace(edit, s, pluralize(text))

class SingularizeTextCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        for s in self.view.sel():
            if s.empty():
                s = self.view.word(s)
            text = self.view.substr(s)
            self.view.replace(edit, s, singularize(text))

class TableizeTextCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        for s in self.view.sel():
            if s.empty():
                s = self.view.word(s)
            text = self.view.substr(s)
            self.view.replace(edit, s, tableize(text))

class TitleizeTextCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        for s in self.view.sel():
            if s.empty():
                s = self.view.word(s)
            text = self.view.substr(s)
            self.view.replace(edit, s, titleize(text))

class TransliterateTextCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        for s in self.view.sel():
            if s.empty():
                s = self.view.word(s)
            text = self.view.substr(s)
            self.view.replace(edit, s, transliterate(text))

class UnderscoreTextCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        for s in self.view.sel():
            if s.empty():
                s = self.view.word(s)
            text = self.view.substr(s)
            self.view.replace(edit, s, underscore(text))
