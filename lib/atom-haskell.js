'use babel';

export default {

  atomHaskellView : null,
  modalPanel : null,
  subscriptions : null,

  activate(state) {
    require('atom-package-deps').install('atom-haskell')
  }
};
