# Sublime Text

## Prepare

Install [Package Control](https://packagecontrol.io/) when you start Sublime Text at the first time: https://packagecontrol.io/installation.

## EditorConfig

[EditorConfig](http://editorconfig.org/) and the [EditorConfig Plugin](https://github.com/sindresorhus/editorconfig-sublime) is used to manage coding styles such as intend style and size, newline charictor and eliminating trailing whitespaces accross different projects. A default `.editorconfig` is included with the dotfiles.

## Language Servers

The [Language Server Protocol](https://github.com/Microsoft/language-server-protocol) is a standardize way for editors (i.e. Language Clients) to integrate with languages (which has a Language Server implementation). See the [Language Servers](./Language%20Server.md) documentation for more information to install them.

## Linters

[SublimeLinter](http://www.sublimelinter.com/) is used to run linters and display errors at edit time. Usually, linters are used if there's no Language Server support for type checking, diagnostics and formatting. We will choice Language Servers over Linters if possible for more completeness of tooling - but will be chosen to enabled globally for scripting languages such as Shell Script, JavaScript and Ruby, which might appear everywhere.

The following linters are enabled globally:

- shellcheck
- eslint
- rubocop

The linters should be installed in your environment to work with [SublimeLinter](http://www.sublimelinter.com/). See the [Linters](./Linters.md) documentation for more information.
