import sublime
import sublime_plugin

import re
import webbrowser

# Regular expression to match URLs
url_rex = re.compile(r'''(?x)
    \b(?:
        https?://(?:(?:[\w\d\-]+(?:\.[\w\d\-.]+)+)|localhost)|  # http://
        www\.[\w\d\-]+(?:\.[\w\d\-.]+)+                         # www.
    )
    /?[\w\d\-.?,!'(){}\[\]/+&@%$#=:"|~;]*                       # url path and query string
    [\w\d\-~:/#@$*+=]                                           # allowed end chars
    ''')


# Extends Sublime Text's LSP Goto Definition command.
# This command will do nothing if multiple regions or characters are selected,
# avoiding conflicts with Sublime's Column Selection feature (Alt+drag).
# Additionally, it will open an URL if detected.
class LspIntelligenceGotoCommand(sublime_plugin.TextCommand):

    def run(self,
            _,
            event=None,
            point=None,
            side_by_side=False,
            force_group=True,
            fallback=False,
            group=-1):
        selected_regions = self.view.sel()
        selected_regions_count = len(selected_regions)

        if (selected_regions_count > 1):
            print(
                "LspIntelligenceGotoCommand: selected_regions_count > 1, ignoring"
            )
            return

        if (selected_regions_count < 1):
            print(
                "LspIntelligenceGotoCommand: selected_regions_count < 1, ignoring"
            )
            return

        first_region = selected_regions[0]
        selected_region_character_count = first_region.end(
        ) - first_region.begin()
        if (selected_region_character_count > 1):
            print(
                "LspIntelligenceGotoCommand: selected_region_character_count > 1, ignoring"
            )
            return

        self.view.run_command(
            "lsp_symbol_definition", {
                "event": event,
                "point": point,
                "side_by_side": side_by_side,
                "force_group": force_group,
                "fallback": fallback,
                "group": group
            })

        url = self.find_url()
        if url:
            webbrowser.open_new_tab(url)

    def find_url(self):
        selected_regions = self.view.sel()
        selected_region = selected_regions[0]
        line_region = self.view.line(selected_region)
        line_text = self.view.substr(line_region)
        start_point = line_region.begin()
        selected_column = selected_region.begin() - start_point

        it = url_rex.finditer(line_text)

        for match in it:
            if match.start() <= (selected_column) and match.end() >= (
                    selected_column):
                url = line_text[match.start():match.end()]
                if url[0:3] == "www":
                    return "http://" + url
                else:
                    return url

        return None
