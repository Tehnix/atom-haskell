'use babel';

import AtomHaskellView from './atom-haskell-view';
import { CompositeDisposable } from 'atom';

export default {

  atomHaskellView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomHaskellView = new AtomHaskellView(state.atomHaskellViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomHaskellView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-haskell:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomHaskellView.destroy();
  },

  serialize() {
    return {
      atomHaskellViewState: this.atomHaskellView.serialize()
    };
  },

  toggle() {
    console.log('AtomHaskell was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
