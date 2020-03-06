# Language Servers

Some editors configured with this dotfiles have dependences on Language Servers. The [Language Server Protocol](https://github.com/Microsoft/language-server-protocol) is a standardize way for editors (i.e. Language Clients) to integrate with languages (which has a Language Server implementation). These Language Servers need to be installed to have the intergrations work.

## [haskell-ide-engine](https://github.com/haskell/haskell-ide-engine)

Follow the [instructions on its README](https://github.com/haskell/haskell-ide-engine#installation) to install.

## [cquery](https://github.com/cquery-project/cquery)

### Mac

```bash
brew install cquery
```

## [Rust Language Server (RLS)](https://github.com/rust-lang/rls)

According to [the Setup section of it's README](https://github.com/rust-lang/rls#setup), you can use [rustup](http://rustup.rs/) to install the required components: `rustup component add rls rust-analysis rust-src --toolchain stable`.

## [reason-language-server](https://github.com/jaredly/reason-language-server)

### Mac

Download `macos.zip` from the [latest release](https://github.com/jaredly/reason-language-server/releases), unzip it, and put the `reason-language-server.exe` file under `~/Library/bin/`.

## [python-language-server](https://github.com/palantir/python-language-server) (Python)

`pip install 'python-language-server[all]'`, not `pip install pyls`!

To use a `pyls` installed in an `venv` with Sublime Text, set the pyls command as following in a `.sublime-project`:

```json
{
  "settings": {
    "LSP": {
      "pyls": {
        "command": [
          "/path/to/your/env-dir/bin/pyls"
        ],
        "enabled": true
      }
    }
  }
}
```

## [solargraph](https://github.com/castwide/solargraph) (Ruby)

`gem install solargraph` or use `~/.bin/solargraph` which loads direnv.

May need to run `yard gems` to have gem documentation installed.
