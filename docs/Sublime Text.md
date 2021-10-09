# Sublime Text

## Prepare

Install [Package Control](https://packagecontrol.io/) when you start Sublime Text at the first time: https://packagecontrol.io/installation.

### Notes on overwritten packages

The dotfiles installation contains overrides of some Package Control installed packages. Package Control might not be able to install such packages properly if the package overrides are placed before Package Control installs those packages. In such case, you'll need to remove all symlinks under `~/Library/Application Support/Sublime Text 3/Packages/` (except `User` and `Theme - Spacegray`), restart Sublime Text 3 to and make sure Package Control installed those packages, then do `~/.dotfiles/install` again.

## EditorConfig

[EditorConfig](http://editorconfig.org/) and the [EditorConfig Plugin](https://github.com/sindresorhus/editorconfig-sublime) is used to manage coding styles such as intend style and size, newline charictor and eliminating trailing whitespaces, accross projects. A default `.editorconfig` is included with the dotfiles.

## Language Servers

The [Language Server Protocol](https://github.com/Microsoft/language-server-protocol) is a standardize way for editors (i.e. Language Clients) to integrate with languages (which has a Language Server implementation).

The [LSP](https://github.com/tomv564/LSP) package is enabled with settings that supports the following languages, all are globally disabled by default, and can be enabled for the current project by running `LSP: Enable Language Server in Project` in the command palette:

- Haskell: [haskell-ide-engine](https://github.com/haskell/haskell-ide-engine)
- C/C++: [cquery](https://github.com/cquery-project/cquery)
- ReasonML: [reason-language-server](https://github.com/jaredly/reason-language-server)

However, you will need the language server installed on your system to use them. See the [Language Servers](./Language%20Server.md) documentation for more information about installation.

## Linters

[SublimeLinter](http://www.sublimelinter.com/) is used to run linters and display errors at edit time. Usually, linters are used if there's no Language Server support for type checking, diagnostics and formatting. We will choice Language Servers over Linters if possible for more completeness of tooling - but will be chosen to enabled globally for scripting languages such as Shell Script, JavaScript and Ruby, which might appear everywhere.

The following linters will be enabled globally:

- shellcheck
- eslint
- rubocop

The linters should be installed in your environment to work with [SublimeLinter](http://www.sublimelinter.com/). See the [Linters](./Linters.md) documentation for more information.
