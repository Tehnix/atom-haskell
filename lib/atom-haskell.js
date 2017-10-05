'use babel';

export default {

  atomHaskellView : null,
  modalPanel : null,
  subscriptions : null,

  activate(state) {
    // Ask the user whether they want to use the default configuration or not.
    atom.notifications.addError('Do you want to setup the default settings?', {
      dismissable: true,
      buttons: [
        {
          text: 'Use default settings',
          onDidClick: () => this.addDefaultConfiguration()
        }
      ],
      description: 'This will configure the various packages for a quick start!'
    })

    // Install the dependencies.
    require('atom-package-deps').install('atom-haskell')
  },

  /*
   * Will setup the configuration snippet from the readme.
   */
  addDefaultConfiguration() {
    // let homeDirectory = 'HOME'

    atom.config.set('autocomplete-haskell.hideHintPanelIfEmpty', false)

    atom.config.set('ide-haskell-repl.defaultRepl', 'stack')

    atom.config.set('ide-haskell-cabal.cabal.activeGhcVersion', '8.0')

    atom.config.set('atom-beautify.general.muteAllErrors', true)
    atom.config.set('atom-beautify.general.showLoadingView', false)
    atom.config.set('atom-beautify.haskell.beautify_on_save', true)

    atom.config.set('haskell-ghc-mod.lowMemorySystem', true)
    atom.config.set('haskell-ghc-mod.onChangeCheck', true)
    atom.config.set('haskell-ghc-mod.onChangeLint', true)
    // atom.config.set('haskell-ghc-mod.additionalPathDirectories', [
    //   homeDirectory + "/.local/bin",
    //   "/opt/local/bin",
    //   "/opt/local/sbin",
    //   "/usr/local/bin",
    //   "/usr/local/sbin",
    //   "/usr/local/bin",
    //   "/usr/bin",
    //   "/usr/sbin"
    // ])

    atom.config.set('ide-haskell.messageDisplayFrontend', "linter")
    atom.config.set('ide-haskell.startupMessageIdeBackend', false)
    atom.config.set('ide-haskell.switchTabOnCheck', false)
    //atom.config.set('ide-haskell.switchTabOnCheck', homeDirectory + "/.local/bin/stylish-haskell")

    //atom.config.set('linter-hlint.hlintExecutablePath', homeDirectory + "/.local/bin/hlint")
    //atom.config.set('linter-hdevtools.hdevtoolsExecutablePath', homeDirectory + "/.local/bin/hdevtools")

    atom.config.set('linter-ui-default.panelHeight', 177)
    atom.config.set('linter-ui-default.showPanel', true)
    atom.config.set('linter-ui-default.hidePanelWhenEmpty', false)
  }
};
