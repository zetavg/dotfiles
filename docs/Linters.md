# Linters

This dotfiles includes some default linter configurations for drop-in usage for small projects. But before using them, make sure you have the corresponding linter and dependencies installed.

## [shellcheck](https://www.shellcheck.net/)

A static analysis tool for shell scripts.

```bash
$ brew install shellcheck
```

## [ESlint](https://eslint.org/)

You can use the globally installed `eslint` with default rules provided in `.eslintrc.json`. Before using `eslint`, you need to install it with some config and plugin packages:

```bash
$ npm install -g eslint babel-eslint eslint-config-airbnb eslint-plugin-react eslint-plugin-react-native eslint-plugin-jsx-a11y eslint-plugin-import
```

## [Flow](https://flow.org/)

Flow is a static type checker for javascript.

```bash
$ npm install -g flow-bin
```

## [RuboCop](https://github.com/bbatsov/rubocop)

A Ruby static code analyzer, based on the community Ruby style guide.

```bash
$ gem install rubocop
```

## [scss-lint](https://github.com/brigade/scss-lint)

```bash
$ gem install scss_lint
```
