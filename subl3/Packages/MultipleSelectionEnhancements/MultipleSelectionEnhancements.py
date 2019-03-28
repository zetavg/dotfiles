import sublime, sublime_plugin

# TODO: Clean closed views from dict
view_previous_selection_regions_dict = {}

class FindUnderExpandWithMemoryCommand(sublime_plugin.WindowCommand):
  def run(self):
    view = self.window.active_view()
    selection = view.sel()
    view_previous_selection_regions_dict[view.id()] = list(selection)
    self.window.run_command('find_under_expand')

class JumpToLatestRegionCommand(sublime_plugin.TextCommand):
  def run(self, edit):
    selection = self.view.sel()
    latest_region = selection[-1]

    previous_selection_regions = view_previous_selection_regions_dict.get(self.view.id())
    print(previous_selection_regions)
    if previous_selection_regions:
        current_selection_regions = list(selection)
        new_selection_regions = [region for region in current_selection_regions if region not in previous_selection_regions]
        if len(new_selection_regions) == 1:
            latest_region = new_selection_regions[0]

    selection.clear()
    selection.add(latest_region)
    cursor_position = latest_region.b
    self.view.show(cursor_position, False)

class SoftUndoWithMemoryMutationCommand(sublime_plugin.WindowCommand):
  def run(self):
    view = self.window.active_view()
    previous_selection_regions = list(view.sel())
    self.window.run_command('soft_undo')
    next_selection_regions = list(view.sel())
    selection_diff = [region for region in previous_selection_regions if region not in next_selection_regions]
    if len(selection_diff) == 1:
        disappeared_region_index = previous_selection_regions.index(selection_diff[0])
        del next_selection_regions[disappeared_region_index - 1]
        view = self.window.active_view()
        view_previous_selection_regions_dict[view.id()] = next_selection_regions
