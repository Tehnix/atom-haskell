# atom-haskell package

Curated set of packages for Haskell development with Atom. The package list taken from [Atom-Haskell Documentation](https://atom-haskell.github.io) (not made by me :). Configuration, documentation and much more can be found there.

This package installs the following for you:

-   [language-haskell](https://atom.io/packages/language-haskell) – Syntax highlighting and Haskell autodetection
-   [ide-haskell](https://atom.io/packages/ide-haskell) – GUI and minimal utilities
-   [ide-haskell-cabal](https://atom.io/packages/ide-haskell-cabal) – Build Haskell projects with either cabal or stack. Reports errors/warnings on build.
-   [haskell-ghc-mod](https://atom.io/packages/haskell-ghc-mod) – ghc-mod integration. Typecheck and lint sources without building, query type information and more.
-   [autocomplete-haskell](https://atom.io/packages/autocomplete-haskell) – Autocompletion support. This plugin depends on haskell-ghc-mod.
-   [haskell-pointfree](https://atom.io/packages/haskell-pointfree) – convert selection to pointfree/pointful representation
-   [ide-haskell-hasktags](https://atom.io/packages/ide-haskell-hasktags) – go to declaration, list all symbols defined in file/project
-   [ide-haskell-hoogle](https://atom.io/packages/ide-haskell-hoogle) – lookup hoogle documentation via local hoogle database
-   [ide-haskell-repl](https://atom.io/packages/ide-haskell-repl) – GHCi REPL in Atom
-   [language-haskell-scoped](https://atom.io/packages/language-haskell-scoped) – highlight known identifiers in editor

Additionally it installs,

-   [atom-hasklig](https://atom.io/packages/hasklig) throws in the nice Hasklig font
-   [atom-beautify](https://atom.io/packages/atom-beautify) use this to beautify instead of `ide-haskell`, to avoid annoying red error boxes when you save a file with a syntax error (this can also beautify a plethora of other languages)
-   [linter](https://atom.io/packages/linter) for prettier `hlint`/`ghc-mod` output
-   [linter-ui-default](https://atom.io/packages/linter-ui-default) which brings some UI additions for the linter
-   [language-yaml](https://atom.io/packages/language-yaml) for all those `stack.yaml`s

which you can optionally disable.

# Binaries

To set up the binaries (except formatters) for the above you can run,

```bash
stack install ghc-mod hoogle hasktags pointfree pointful cabal-install
```

For formatters you have some choice between `stylish-haskell`, `hindent` and `brittany`, whichever you prefer. E.g.,

```bash
stack install hindent
```

# Other things

Finally, a bit of a self-plug, but I recommend the theme [Spacemacs Dark](https://github.com/Tehnix/spacemacsdark-syntax-atom), where I added some additional highlighting for Haskell. It is, as the name implies, inspired by the Spacemacs dark theme.

![Screenshot of Spacemacs Dark Syntax](https://user-images.githubusercontent.com/1189998/29494933-b0e81f7a-85ef-11e7-8359-8550f32d6760.png)

## Quick configuration

If anyone knows how to make a plugin setup configuration for other plugins, then please let me know! Until then, you can drop this bit into your `Atom -> Config...` (replace all occurences of `HOME` with your $HOME dir!),

```yaml
"*":
  "atom-beautify":
    general:
      muteAllErrors: true
      showLoadingView: false
    haskell:
      beautify_on_save: true
  "autocomplete-haskell":
    hideHintPanelIfEmpty: false
  "haskell-ghc-mod":
    additionalPathDirectories: [
      "/HOME/.local/bin"
      "/opt/local/bin"
      "/opt/local/sbin"
      "/usr/local/bin"
      "/usr/local/sbin"
      "/usr/local/bin"
      "/usr/bin:/bin"
      "/usr/sbin"
    ]
    lowMemorySystem: true
    onChangeCheck: true
    onChangeLint: true
  "ide-haskell":
    messageDisplayFrontend: "linter"
    startupMessageIdeBackend: false
    stylishHaskellPath: "/HOME/.local/bin/stylish-haskell"
    switchTabOnCheck: false
  "ide-haskell-cabal":
    cabal:
      activeGhcVersion: "8.0"
  "ide-haskell-repl":
    defaultRepl: "stack"
  "linter-hdevtools":
    hdevtoolsExecutablePath: "/HOME/.local/bin/hdevtools"
  "linter-hlint":
    hlintExecutablePath: "/HOME/.local/bin/hlint"
  "linter-ui-default":
    panelHeight: 177
    showPanel: true
  "tree-view":
    hideIgnoredNames: true
    showOnRightSide: false
    squashDirectoryNames: true
  "vim-mode-plus":
    charactersToAddSpaceOnSurround: [
      "("
      "{"
      "["
      "<"
    ]
    statusBarModeStringStyle: "long"
  welcome:
    showOnStartup: false
```

## Spacemacs-esque keybindings

You might also like my keybindings, if you're coming from spacemacs and still have that muscle memory.

You'll need,

-   [vim-mode-plus](https://atom.io/packages/vim-mode-plus) the preferred vim mode
-   [keystroke](https://atom.io/packages/keystroke) to define commands through keystrokes (i.e. several commands in a row)
-   [copy-file-contents](https://atom.io/packages/copy-file-contents) to copy a files contents

Or, one line `apm install vim-mode-plus keystroke copy-file-contents`.

And then add this to your keymap file (`Atom -> Keymap...`).

```yaml
'body':
  'ctrl-n': 'unset!'

'atom-text-editor.vim-mode-plus:not(.insert-mode)':
  # Map shift + U to redo, for a more natural feeling.
  'U': 'core:redo'
  #'tab': 'unset!'
  # Emulate vim-multiple-cursors -----
  'ctrl-n': 'find-and-replace:select-next'
  'ctrl-p': 'find-and-replace:select-undo'
  'ctrl-x': 'find-and-replace:select-skip'
  # Emulate som Spacemacs keybindings -----
  'space \'': 'term3:open-split-down'
  'space tab': 'pane:show-previous-recently-used-item'
  'space 1': 'pane:show-item-1'
  'space 2': 'pane:show-item-2'
  'space 3': 'pane:show-item-3'
  'space 4': 'pane:show-item-4'
  'space 5': 'pane:show-item-5'
  'space 6': 'pane:show-item-6'
  'space 7': 'pane:show-item-7'
  'space 8': 'pane:show-item-8'
  'space 9': 'pane:show-item-9'
  # +files
  'space f t': 'tree-view:toggle'
  'space f f': 'fuzzy-finder:toggle-file-finder'
  'space f F': 'fuzzy-finder:toggle-file-finder'
  'space f s': 'core:save'
  'space f S': 'window:save-all'
  'space f y': 'editor:copy-path'
  'space f R': 'tree-view:rename'
  'space f c': 'copy-file-contents:copy'
  'space f C d': 'line-ending-selector:convert-to-CRLF'
  'space f C u': 'line-ending-selector:convert-to-LF'
  'space f e d': 'settings-view:open'
  'space f e k': 'settings-view:show-keybindings'
  'space f e t': 'settings-view:change-themes'
  'space f e p': 'settings-view:view-installed-packages'
  'space f e i': 'window:toggle-dev-tools'
  # +compile/comments
  'space c l': 'editor:toggle-line-comments'
  'space c y': 'keystroke y y space c l'
  # +buffers
  'space b p': 'vim-mode-plus:previous-tab'
  'space b n': 'vim-mode-plus:next-tab'
  'space b N': 'application:new-file'
  'space b m': 'tabs:close-other-tabs'
  # +narrow/numbers
  'space n ,': 'core:page-up'
  'space n .': 'core:page-down'
  # +search/symbols
  'space s f': 'find-and-replace:show'
  'space s F': 'project-find:show'
  # +UI toggles/themes
  'space T F': 'window:toggle-full-screen'
  'space T P': 'markdown-preview:toggle'
  'space T p': 'command-palette:toggle'
  'space T t':  'status-bar:toggle'
  'space T s': 'settings-view:change-themes'
  # +toggles
  'space t n': 'editor:toggle-line-numbers'
  'space t i': 'editor:toggle-indent-guide'
  'space t I': 'window:toggle-auto-indent'
  # 'editor:toggle-soft-wrap'
  # 'editor:toggle-soft-tabs'
  # +windows
  'space w h': 'window:focus-pane-on-left'
  'space w l': 'window:focus-pane-on-right'
  'space w k': 'window:focus-pane-above'
  'space w j': 'window:focus-pane-below'
  'space w s': 'pane:split-down-and-copy-active-item'
  'space w v': 'pane:split-right-and-copy-active-item'
  # +text
  'space x U': 'editor:upper-case'
  'space x u': 'editor:lower-case'
  'space x j': 'editor:move-line-down'
  'space x k': 'editor:move-line-up'
  'space x J': 'editor:move-line-down'
  'space x K': 'editor:move-line-up'


# Haskell specific bindings (trying to match Spacemacs haskell layer)
'atom-text-editor.vim-mode-plus:not(.insert-mode)[data-grammar="source haskell"]':
  # haskell/documentation
  'space m h h': 'ide-haskell-hoogle:show-web-doc-for-symbol'
  'space m h H': 'ide-haskell-hoogle:show-web-doc-for-symbol'
  'space m h t': 'haskell-ghc-mod:show-type'
  'space m h i': 'haskell-ghc-mod:show-type-and-info'
  'space m h T': 'haskell-ghc-mod:insert-type'
  'space m h I': 'haskell-ghc-mod:show-info'
  # haskell/navigation
  'space m g g': 'haskell-ghc-mod:go-to-declaration' # or 'ide-haskell-hasktags:go-to-declaration'
  'space m g b': 'ide-haskell-hasktags:go-back'
  'space m g t': 'ide-haskell-hasktags:show-tags'
  'space m g f': 'ide-haskell-hasktags:show-file-tags'
  # haskell/repl
  'space m s b': 'ide-haskell-repl:toggle'
  # haskell/refactor
  'space m r s': 'haskell-ghc-mod:sig-fill'
  'space m r i': 'haskell-ghc-mod:insert-import'
  'space m r c': 'haskell-ghc-mod:case-split'
  'space m r C': 'haskell-ghc-mod:check-file'
  'space m r L': 'haskell-ghc-mod:lint-file'
  'space m r p': 'haskell-pointfree:toggle'
```
