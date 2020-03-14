# Karabiner Config

Configurations for [Karabiner-Elements](https://pqrs.org/osx/karabiner/), a powerful keyboard customizer for macOS. You can [download](karabiner.json) the standalone configurations and place it under `~/.config/karabiner` to git them work.

**Important:** the config file `karabiner.json` is rendered from the ERB file `karabiner.json.erb`. **DO NOT EDIT `karabiner.json` DIRECTLY.**

## Build Config

Run:

```bash
make
```

after editing `karabiner.json.erb` to generate the new config file.

## Modifications

This Karabiner config adds the following modifications:

### `⇪ → (alone ? A/注 : ⌃)`

Press the <kbd>⇪</kbd> (caps lock) key once to switch the input method between `ABC` and `注音`. Press and hold the <kbd>⇪</kbd> key will make it acts as the control key (<kbd>⌃</kbd>).

### `⇧⌫ → ⌦`

Pressing the <kbd>delete</kbd> key while holding the <kbd>⇧</kbd> (Shift) key will make a forward delete, same as pressing <kbd>fn</kbd> + <kbd>delete</kbd>, but being more easy to press.

### Vi Mode

This is a combination of rules for achieving an OS-wide `vi` experience, i.e. using the <kbd>H</kbd>, <kbd>J</kbd>, <kbd>K</kbd> and <kbd>L</kbd> key as <kbd>←</kbd>, <kbd>↓</kbd>, <kbd>↑</kbd> and <kbd>→</kbd>, keeping your right hand from continuously moving away and back to the typing position, only for pressing the arrow keys on the far-lower-left-corner of the keyboard.

The general rule is to press and hold the <kbd>;</kbd> key with the little finger to activate vi mode. With the <kbd>;</kbd> key pressed down, the <kbd>H</kbd>, <kbd>J</kbd>, <kbd>K</kbd> and <kbd>L</kbd> key will be binded to arrow keys, <kbd>←</kbd>, <kbd>↓</kbd>, <kbd>↑</kbd> and <kbd>→</kbd>. If the <kbd>;</kbd> is not pressed down, then the vi mode will be deactivated and everything acts as normal. Pressing the <kbd>;</kbd> once, or with other combinations such as the shift key remains the same behavior, so it's totaly compatible to normal typing habits.

The reason of choosing the <kbd>;</kbd> as the vi mode activation key is because of these reasons:

1. Will not occupy keys that already has heavy responsibilities, such as the command, option or control key.
2. It is very easy to press with hands placed in the typing position.
3. You can use only one hand to press the <kbd>H</kbd>, <kbd>J</kbd>, <kbd>K</kbd> and <kbd>L</kbd> keys while holding the <kbd>;</kbd> key.
4. In vast majority, you won't type the letter `h`, `j`, `k` or `l` directly after a `;`, so binding away `; + h`, `; + j`, `; + k` and `; + l` will not be a interference even you are typing fast - sometimes pressing down the next key before releasing the previous one.

Vi mode is achieved by the following rules, each can be disabled or modified alone:

#### Vi Mode [;]

Binds the <kbd>;</kbd> key as the vi mode activation key. Vi mode will be activated while the <kbd>;</kbd> key is pressed (and held) down.

#### Vi Mode - HJKL

Binds the <kbd>H</kbd>, <kbd>J</kbd>, <kbd>K</kbd> and <kbd>L</kbd> keys to arrow keys, <kbd>←</kbd>, <kbd>↓</kbd>, <kbd>↑</kbd> and <kbd>→</kbd>, while vi mode is activated.

#### Vi Mode - Repeats

This is an additional rule. An example is: press down and hold <kbd>;</kbd>, then press <kbd>1</kbd>, <kbd>2</kbd>, <kbd>j</kbd>, will map to the <kbd>↓</kbd> be pressed twelve times.

Sometimes this will messed up 注音 typers because in the 注音 input method, it's possible that number keys, such as <kbd>3</kbd> (`ˇ`), <kbd>4</kbd> (`ˋ`), <kbd>6</kbd> (`ˊ`), be pressed directly after the <kbd>;</kbd> (`ㄤ`) key, for example typing "網" ("ㄨㄤˇ", <kbd>j</kbd>, <kbd>;</kbd>, <kbd>3</kbd>). When one is typing fast and pressed down the next key before releasing the previous one, for example, <kbd>;</kbd>, <kbd>3</kbd> becomes <kbd>;</kbd> + <kbd>3</kbd> and will be binded to *Vi Mode - Repeats* rather then typing out "ㄤˇ".

#### Vi Mode - Show Relative Line Numbers

This is a special rule that binds <kbd>;</kbd> + <kbd>I</kbd> to <kbd>⌘</kbd> + <kbd>⌃</kbd> + <kbd>R</kbd>. So you can configure your editor to show relative line numbers when pressing <kbd>⌘</kbd> + <kbd>⌃</kbd> + <kbd>R</kbd>, while you can press a sorter and easier <kbd>;</kbd> + <kbd>I</kbd>.

#### Vi Mode [;] - Fast Typing Fixups

These are fixups for fast typing, sometimes pressing down the next key before releasing the previous one. For example, it binds pressing and holding <kbd>;</kbd> + <kbd>a</kbd> to <kbd>;</kbd>, <kbd>a</kbd>, so things won't be messed up while you're not pressing an vi mode meaningful key combination.

### ⌘ Key Sequences

Because most combinations with ⌘, ⌥, ⌃ and ⇧ are already be occupied, it's hard for us to define new, especially system-global hotkeys that are eazy to press. (e.g. `⌘⌥⌃⇧A` is really not a eazy-to-press hotkey!)

So there comes *key sequences*.

This modification rule binds pressing <kbd>⌘</kbd> twice, following with any letter keys (i.e. `A-Z`) in a row, to <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>⌃</kbd> + <kbd>⇧</kbd> + <kbd>[the letter key you pressed]</kbd>. So you can define the key combination `⌘⌥⌃⇧[A-Z]`, which will definatly not conflict with any hotkey you will actually use, in your application, and invoke them with the "⌘" key sequences.
