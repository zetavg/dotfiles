# Language Servers

Some editors configured with this dotfiles have dependences on Language Servers. The [Language Server Protocol](https://github.com/Microsoft/language-server-protocol) is a standardize way for editors (i.e. Language Clients) to integrate with languages (which has a Language Server implementation). These Language Servers need to be installed to have the intergrations work.

## [haskell-ide-engine](https://github.com/haskell/haskell-ide-engine)

Follow the [instructions on its README](https://github.com/haskell/haskell-ide-engine#installation) to install.

## [cquery](https://github.com/cquery-project/cquery)

### Mac

```bash
brew install cquery
```

## eslint-server

This is not a actual language server, but by using the language server provided in [vscode-eslint](https://github.com/microsoft/vscode-eslint), the VS Code ESLint extension, other editors that supports LSP can get the eslint features such as "Quick Fix" in VS Code.

To install this language server, you'll need to get and build the [vscode-eslint](https://github.com/microsoft/vscode-eslint) source code manually:

```bash
cd [some-dir]
git clone https://github.com/microsoft/vscode-eslint.git --depth 10
cd vscode-eslint
npm install
npm run webpack
realpath server/out/eslintServer.js  # Ensure build output exists
```

Then, create a `eslint-server` wrapper and place it under somewhere in your `$PATH`, such as:

```bash
#!/usr/bin/env bash
node [some-dir]/server/out/eslintServer.js "$@"
```

Don't forget to `chmod +x eslint-server`! And at last, make sure you can run `eslint-server` in a terminal:

```bash
$ eslint-server --stdio
Content-Length: 117

{"jsonrpc":"2.0","method":"window/logMessage","params":{"type":3,"message":"ESLint server running in node v10.15.0"}}
```

> Note that some of the default configurations are not built into the language server, but provided by the VS Code extension from the [`workspace/configuration` request](https://microsoft.github.io/language-server-protocol/specifications/specification-current/#workspace_configuration), you'll need to configure your language server client to provide some of the required configurations correctly, or `eslint-server` might crash or being unable to work properly. A sample of the configuration in respond of the language server `workspace/configuration: {'items': [{'scopeUri': '...', 'section': '...'}]}` request is:
> 
> ```json
> [{
>   "validate": "on",
>   "run": "onType",
>   "nodePath": null,
>   "codeAction": {
>     "disableRuleComment": {
>       "enable": true,
>       "location": "separateLine"
>     },
>     "showDocumentation": {
>       "enable": true
>     },
>   },
>   "onIgnoredFiles": "off",
> }]
> ```
> 
> See the `eslint-server` section in the [Sublime Text LSP settings](../subl3/Packages/User/LSP.sublime-settings) file as a reference.

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
