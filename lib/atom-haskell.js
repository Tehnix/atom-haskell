'use babel';

import { CompositeDisposable } from 'atom';

const packageName = 'atom-haskell'
const notificationMessage = 'Do you want to setup the default settings?'

export default {

  atomHaskellView : null,
  modalPanel : null,
  subscriptions : null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable.
    this.subscriptions = new CompositeDisposable();
    // Register command that forces the default configuration to be added.
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-haskell:set-default-configuration': () => this.addDefaultConfiguration()
    }));

    let configAdded = atom.config.get(packageName + '.hasAddedConfiguration')
    if (!configAdded) {
      // Ask the user whether they want to use the default configuration or not.
      atom.notifications.addInfo(notificationMessage, {
        dismissable: true,
        buttons: [
          {
            text: 'Use default settings',
            onDidClick: () => this.addDefaultConfiguration()
          },
          {
            text: 'No thanks!',
            onDidClick: () => this.markConfigAsSet()
          }
        ],
        description: 'This will only overwrite the specific settings set by this package, and nothing else.'
      })
    }

    // Install the dependencies.
    require('atom-package-deps').install('atom-haskell')
  },

  markConfigAsSet() {
    atom.config.set(packageName + '.hasAddedConfiguration', true)
  },

  /*
   * Will setup the configuration snippet from the readme.
   */
  addDefaultConfiguration() {
    // TODO: Get the users home directory.
    // let homeDirectory = 'HOME'
    atom.config.set('editor.fontFamily', 'Hasklig')
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

    this.markConfigAsSet()

    // TODO: Find a better way to dismiss the current notification.
    atom.notifications.getNotifications().forEach(function(notification) {
      if (notification.message === notificationMessage) {
        notification.dismiss()
      }
    })
  }
};
