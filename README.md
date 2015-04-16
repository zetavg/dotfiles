Neson's dotfiles
================

## Installation

```bash
git clone https://github.com/Neson/dotfiles.git
dotfiles/install
```
The installation script will create symlinks to the cloned repository for all the dotfiles included (e.g.`~/.profile`→`_profile`), old ones will be automatically backup as `.bak` & replaced.

### Shell

The file `~/.profile_after_initialized` will be sourced if exists. Place enviroment specific startup scripts (e.g. rvm, nvm) in this file.

### OSX

BetterTouchTool settings, Terminal profiles and other things are in `osx/`.

### Sublime Text 3

* Install Package Control: [https://sublime.wbond.net/installation](https://sublime.wbond.net/installation)

* Install the fonts in `fonts/`

* Install OS X command line tool - subl

```bash
ln -s "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl" ~/bin/subl
```

### Install Private Profiles

`cd` into the local `dotfiles` repository and then:
```bash
git clone [private dotfiles repo] secret
./install
```

**IMPORTANT: EXECUTE `dotfiles/install` ASAP TO REMOVE OTHERS' READ PERMISSION TO `secret`!**

The Private Profiles Repository contains:
* `secret/subl2`: Sublime Text 2 Settings that includes secret keys, passowrds, etc.
* `secret/gitcfg`: gitcfg profiles
* `secret/_*`: other files that should be placed as `~/.*`, e.g. `_ssh`→`~/.ssh`

## Update

`cd` into the local `dotfiles` repository and then:
```bash
git pull
./install
```
