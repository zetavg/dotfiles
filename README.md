# dotfiles

[![Build Status](https://travis-ci.org/zetavg/dotfiles.svg?branch=master)](https://travis-ci.org/zetavg/dotfiles)

@zetavg's dotfiles, including handy scripts, configurations for bash.


## Install

```bash
$ cd ~
$ git clone https://github.com/zetavg/dotfiles.git .dotfiles
$ .dotfiles/install
```

The installation script  will  create  symlinks  for  the  actual  place  where
dotfiles should live to the files or directories in `.dotfiles`  (a simple rule
is `~/.profile` → `<dotfiles>/_profile`, see `install` for more complex rules).
If a file or  directory  already  exists  at  the  desired  location,  the  old
ones will be automatically renamed to `*.<time_stamp>.bak`.

Further setup  instructions  for  different  environment,  OS,  and  tools  are 
expanded in the separated sections below.

### Private Dotfiles

Create or link a directory named `secret` under the dotfiles directory. In the
`secret` directory, you can  have  files  and  directories  named  `_*`  to  be
automatically linked as `~/.*`, and also a `install` shell script that installs
custom secret dotfiles is appreciable.

The private dotfiles will be installed alone with other when running `install`
on the main directory, but will be ignored by the main git repository.

## Update

`cd` into the local dotfiles repository, then run:

```bash
$ git pull
$ ./install
```
