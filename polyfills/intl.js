'use strict';

// Give JSDOM the Node-native Intl API
function patchIntl(window) {
  window.Intl = Intl;

  return window;
}

module.exports = patchIntl;