# zsh

Using [zsh](http://www.zsh.org/) with [antibody](https://github.com/getantibody/antibody)

## Install

Install zsh and antibody using Homebrew:

```bash
$ brew install zsh getantibody/tap/antibody
```

## Add and Remove Bundle

To add a antibody bundle, edit `_zshrc` and add the bundle name to the `bundles` array. To remove it, run `$ antibody purge <bundle-name>`, then edit `_zshrc` and remove the bundle name from `bundles`.
