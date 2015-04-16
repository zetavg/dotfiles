# this script will run if the theme is selected by zsht
#

# XD
function LMOTD() {
  S_WIDTH=$(tput cols)
  echo ''
  [[ $(( $S_WIDTH >= 74 )) = 1 ]] && echo -n " __                                            "
  echo "                __         "
  [[ $(( $S_WIDTH >= 74 )) = 1 ]] && echo -n "/\\ \\                                           "
  echo "               /\\ \\        "
  [[ $(( $S_WIDTH >= 74 )) = 1 ]] && echo -n "\\ \\ \\          ___      __     ___     ___     "
  echo "  ____     ____\\ \\ \\___    "
  [[ $(( $S_WIDTH >= 74 )) = 1 ]] && echo -n " \\ \\ \\        / __\`\\  /'_ \`\\  / __\`\\ /' _ \`\\   "
  echo -n " /\\_ ,\`\\  /',__\\"; echo "\\ \\  _ \`\\  "
  [[ $(( $S_WIDTH >= 74 )) = 1 ]] && echo -n "  \\ \\ \\_____,/\\ \\L\\ \\/\\ \\L\\ \\/\\ \\L\\ \\/\\ \\/\\ \\  "
  echo -n " \\/_/  /_/\\__, \`\\"; echo "\\ \\ \\ \\ \\ "
  [[ $(( $S_WIDTH >= 74 )) = 1 ]] && echo -n "   \\ \\_______\\ \\____/\\ \\____ \\ \\____/\\ \\_\\ \\_\\ "
  echo "   /\\____\\/\\____/ \\ \\_\\ \\_\\"
  [[ $(( $S_WIDTH >= 74 )) = 1 ]] && echo -n "    \\/______/ \\/___/  \\/___L\\ \\/___/  \\/_/\\/_/ "
  echo "   \\/____/\\/___/   \\/_/\\/_/"
  [[ $(( $S_WIDTH >= 74 )) = 1 ]] && echo -n "                        /\\____/                "
  echo "                           "
  [[ $(( $S_WIDTH >= 74 )) = 1 ]] && echo -n "                        \\_/__/ "
  if [[ $(( $S_WIDTH >= 74 )) = 1 ]]; then
    LMOTD_DATE=$(date)
    LMOTD_DATE_C=${#LMOTD_DATE}
    LMOTD_DATE_FWC=$(echo $LMOTD_DATE | grep -s -q -o [年月日周時分秒一二三四五六日] | wc -l | sed 's/ //g')  &> /dev/null
    LMOTD_DATE_C=$(($LMOTD_DATE_C + $LMOTD_DATE_FWC))
    LMOTD_DATE_BC=$((43 - $LMOTD_DATE_C))
    LMOTD_DATE_B=' '
    for i in {2..$LMOTD_DATE_BC}; do
      LMOTD_DATE_B="$LMOTD_DATE_B "
    done
    echo "$LMOTD_DATE_B$LMOTD_DATE"
  fi

  echo ""
}

LMOTD

echo ""

# zsh syntax highlighting
if [[ -n $ZSH_HIGHLIGHT_HIGHLIGHTERS ]]; then
  ZSH_HIGHLIGHT_HIGHLIGHTERS=(main brackets cursor pattern)

  ZSH_HIGHLIGHT_STYLES[default]='none'
  ZSH_HIGHLIGHT_STYLES[unknown-token]='fg=red,bold'
  ZSH_HIGHLIGHT_STYLES[reserved-word]='fg=yellow'
  ZSH_HIGHLIGHT_STYLES[alias]='fg=green'
  ZSH_HIGHLIGHT_STYLES[builtin]='fg=green'
  ZSH_HIGHLIGHT_STYLES[function]='fg=green'
  ZSH_HIGHLIGHT_STYLES[command]='fg=green'
  ZSH_HIGHLIGHT_STYLES[precommand]='fg=green'
  ZSH_HIGHLIGHT_STYLES[commandseparator]='none'
  ZSH_HIGHLIGHT_STYLES[hashed-command]='fg=green'
  ZSH_HIGHLIGHT_STYLES[path]='bg=8,fg=yellow'
  ZSH_HIGHLIGHT_STYLES[path_prefix]='bg=8,fg=yellow'
  ZSH_HIGHLIGHT_STYLES[path_approx]='bg=8,fg=yellow'
  ZSH_HIGHLIGHT_STYLES[globbing]='fg=blue'
  ZSH_HIGHLIGHT_STYLES[history-expansion]='fg=blue'
  ZSH_HIGHLIGHT_STYLES[single-hyphen-option]='fg=10'
  ZSH_HIGHLIGHT_STYLES[double-hyphen-option]='fg=10'
  ZSH_HIGHLIGHT_STYLES[back-quoted-argument]='none'
  ZSH_HIGHLIGHT_STYLES[single-quoted-argument]='fg=yellow'
  ZSH_HIGHLIGHT_STYLES[double-quoted-argument]='fg=yellow'
  ZSH_HIGHLIGHT_STYLES[dollar-double-quoted-argument]='fg=cyan'
  ZSH_HIGHLIGHT_STYLES[back-double-quoted-argument]='fg=cyan'
  ZSH_HIGHLIGHT_STYLES[assign]='none'

  ZSH_HIGHLIGHT_STYLES[bracket-error]='fg=0,bg=5'
  ZSH_HIGHLIGHT_STYLES[cursor-matchingbracket]='underline'
  ZSH_HIGHLIGHT_STYLES[bracket-level-1]='none'
  ZSH_HIGHLIGHT_STYLES[bracket-level-2]='none'
  ZSH_HIGHLIGHT_STYLES[bracket-level-3]='none'
  ZSH_HIGHLIGHT_STYLES[bracket-level-4]='none'

  ZSH_HIGHLIGHT_STYLES[cursor]='fg=15'

  ZSH_HIGHLIGHT_PATTERNS+=('git add' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git am' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git apply' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git archimport' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git archive' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git bisect' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git blame' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git branch' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git bundle' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git cat-file' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git check-attr' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git check-ref-format' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git checkout' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git checkout-index' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git cherry' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git cherry-pick' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git citool' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git clean' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git clone' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git commit' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git commit-tree' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git config' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git count-objects' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git cvsexportcommit' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git cvsimport' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git cvsserver' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git daemon' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git describe' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git diff' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git diff-files' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git diff-index' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git diff-tree' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git difftool' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git fast-export' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git fast-import' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git fetch' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git fetch-pack' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git filter-branch' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git flow' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git fmt-merge-msg' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git for-each-ref' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git format-patch' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git fsck' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git gc' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git get-tar-commit-id' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git grep' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git gui' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git hash-object' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git help' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git http-backend' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git http-fetch' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git http-push' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git imap-send' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git index-pack' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git init' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git instaweb' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git log' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git ls-files' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git ls-remote' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git ls-tree' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git mailinfo' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git mailsplit' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git merge' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git merge-base' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git merge-file' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git merge-index' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git merge-one-file' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git merge-tree' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git mergetool' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git mktag' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git mktree' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git mv' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git name-rev' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git notes' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git pack-objects' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git pack-redundant' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git pack-refs' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git parse-remote' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git patch-id' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git prune' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git prune-packed' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git pull' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git push' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git quiltimport' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git read-tree' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git rebase' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git receive-pack' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git reflog' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git relink' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git remote' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git repack' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git replace' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git request-pull' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git rerere' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git reset' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git rev-list' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git rev-parse' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git revert' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git rm' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git send-email' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git send-pack' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git shell' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git shortlog' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git show' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git show-branch' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git show-index' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git show-ref' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git stash' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git status' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git stripspace' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git submodule' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git svn' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git symbolic-ref' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git tag' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git unpack-file' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git unpack-objects' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git update-index' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git update-ref' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git update-server-info' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git upload-archive' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git upload-pack' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git var' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git verify-pack' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git verify-tag' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git whatchanged' 'fg=green')
  ZSH_HIGHLIGHT_PATTERNS+=('git write-tree' 'fg=green')

  ZSH_HIGHLIGHT_PATTERNS+=('rm -rf *' 'fg=white,bold,bg=red')
fi
