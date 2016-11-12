if not functions -q fundle
  set need_to_install_fundle 1
end

if set -q need_to_install_fundle
  eval (curl -sfL https://git.io/fundle-install)
end

fundle plugin 'edc/bass'
fundle plugin 'neson/agnoster'
fundle plugin 'fisherman/rvm'

fundle init

if set -q need_to_install_fundle
  fundle install
end

set fish_color_normal "normal"
set fish_color_command "green"
set fish_color_quote "yellow"
set fish_color_valid_path "yellow"  "--underline"
set fish_color_redirection "brblue"
set fish_color_end "red"
set fish_color_error "brred"
set fish_color_param "normal"
set fish_color_comment "brblack"
set fish_color_match "--background=brblue"
set fish_color_search_match "brcyan" "--background=brblack"
set fish_color_operator "brcyan"
set fish_color_escape "brcyan" "--bold"
set fish_color_cwd "green"
set fish_color_autosuggestion "brblack"

set fish_pager_color_prefix "--bold" "--underline" "--background=brblack"
set fish_pager_color_completion "brgreen"
set fish_pager_color_description "brblack"
set fish_pager_color_progress "black"
set fish_pager_color_secondary ""

bass source "$HOME/.shell_profile"

if which rvm > /dev/null
  source "$HOME/.config/fish/fundle/fisherman/rvm/conf.d/rvm.fish"
  rvm use default > /dev/null 2>&1
end
