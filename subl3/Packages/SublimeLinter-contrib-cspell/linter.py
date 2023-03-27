from SublimeLinter.lint import Linter, STREAM_STDOUT

class CSpell(Linter):
    cmd = 'cspell stdin'
    defaults = {'selector': 'source'}
    regex = r'^(?P<not_filename>[^:]*):(?P<line>\d+):(?P<col>\d+) - (?P<message>.*)$'
    error_stream = STREAM_STDOUT

    def run(self, cmd, code):
        return super().run(cmd, code)
