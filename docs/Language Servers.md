# Language Servers

Some editors configured with this dotfiles have dependences on Language Servers. The [Language Server Protocol](https://github.com/Microsoft/language-server-protocol) is a standardize way for editors (i.e. Language Clients) to integrate with languages (which has a Language Server implementation). These Language Servers need to be installed to have the intergrations work.

## [haskell-ide-engine](https://github.com/haskell/haskell-ide-engine)

Follow the [instructions on its README](https://github.com/haskell/haskell-ide-engine#installation) to install.

## [ocaml-language-server](https://github.com/freebroccolo/ocaml-language-server/)

The engine that powers OCaml and Reason's editors support.

```bash
$ npm install -g https://github.com/reasonml/reason-cli/archive/3.0.1-bin-darwin.tar.gz
$ npm install -g ocaml-language-server
```
