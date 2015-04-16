# Neson's zsh theme


ZSH_THEME_GIT_PROMPT_PREFIX=""
ZSH_THEME_GIT_PROMPT_SUFFIX=""
ZSH_THEME_GIT_PROMPT_DIRTY="*"
ZSH_THEME_GIT_PROMPT_CLEAN=""


alias zsh-disgit='ZSH_GIT=off'
alias zsh-engit='ZSH_GIT=on'


function display_git_status() {

  if [[ "$ZSH_GIT" != "off" ]]; then
    if git rev-parse --git-dir > /dev/null 2>&1; then
    # Only proceed if there is actually a commit.
      echo "Git:$(git_project_name):$(git_prompt_info) $(git_time_since_commit)"
    fi
  else
    echo "[Git status disabled]"
  fi
}


function git_time_since_commit() {

  # Get the last commit.
  last_commit=`git log --pretty=format:'%at' -1 2> /dev/null`
  now=`date +%s`
  seconds_since_last_commit=$((now-last_commit))

  # Totals
  MINUTES=$((seconds_since_last_commit / 60))
  HOURS=$((seconds_since_last_commit/3600))

  # Sub-hours and sub-minutes
  DAYS=$((seconds_since_last_commit / 86400))
  SUB_HOURS=$((HOURS % 24))
  SUB_MINUTES=$((MINUTES % 60))

  # Echo
  echo "[${DAYS}d${SUB_HOURS}h${SUB_MINUTES}m]"
}


function git_project_name() {

  echo `git remote -v | head -n1 | awk '{print $2}' | sed 's/.*\///' | sed 's/\.git//'`
}


function is_git_dirty() {

  local SUBMODULE_SYNTAX=''
  if [[ $POST_1_7_2_GIT -gt 0 ]]; then
        SUBMODULE_SYNTAX="--ignore-submodules=dirty"
  fi
  if [[ -n $(git status -s ${SUBMODULE_SYNTAX}  2> /dev/null) ]]; then
    echo "dirty"
  else
    echo "clean"
  fi
}


function display_rvm_status() {

  if [[ -s "$HOME/.rvm" ]]; then
    rvm_current_ruby=`$HOME/.rvm/bin/rvm-prompt`
    [[ $(rvm list default | grep -c $rvm_current_ruby) == 0 ]] && echo "♦ $(sed 's/^ruby-//g' <<< $rvm_current_ruby) "
  fi
}


function display_group_status() {

  current_group=$(groups | sed 's/ .*//g')
  if [[ $current_group != $USER && $current_group != "staff" && $current_group != "users" ]]; then
    echo ":$current_group"
  fi
}


function get_hostname() {
  if [[ `uname` == "Darwin" ]]; then
    my_hostname="%{$FG[151]%}$(scutil --get ComputerName | sed "s/MacBook Pro /MBP/g" | sed "s/MacBook Air /MBA/g" | sed "s/ 的 /'s_/g" | sed "s/${USER}'s_//g")%{$reset_color%}"
  else
    my_hostname=$(hostname)
  fi
}; get_hostname


function display_hostname() {

  echo $my_hostname
}


PROMPT='
%{$FG[025]%}[%{$reset_color%}%{$FG[white]%}%~%{$FG[025]%}]%{$reset_color%} %(?..%{$fg[red]%}! )%{$reset_color%}%{$FG[white]%}%n%{$FG[130]%}$(display_group_status)%{$reset_color%}@$(display_hostname) %{$FG[052]%}$(display_rvm_status)%{$reset_color%}%{$FG[234]%}- %D %*%{$reset_color%}
 %(!.#.$)%{$reset_color%} '
RPROMPT='%{$FG[008]%}%p $(display_git_status) `git config --get user.name`%{$reset_color%}'


# See http://geoff.greer.fm/lscolors/
export LSCOLORS="exfxcxdxbxbxbxbxbxbxbx"
export LS_COLORS="di=34;40:ln=35;40:so=32;40:pi=33;40:ex=31;40:bd=31;40:cd=31;40:su=31;40:sg=31;40:tw=31;40:ow=31;40:"
