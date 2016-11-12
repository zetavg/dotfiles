if not functions -q fundle
  set need_to_install_fundle 1
end

if set -q need_to_install_fundle
  eval (curl -sfL https://git.io/fundle-install)
end

fundle plugin 'edc/bass'
fundle plugin 'neson/agnoster'

fundle init

if set -q need_to_install_fundle
  fundle install
end

bass source "$HOME/.shell_profile"
