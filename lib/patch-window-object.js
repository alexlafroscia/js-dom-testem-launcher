'use strict';

const requireDir = require('require-dir');
const polyfills = requireDir('../polyfills');

function patchWindowObject(window) {
  for (const prop of Object.keys(polyfills)) {
    const func = polyfills[prop];
    
    if (typeof func === 'function') {
      window = func(window);
    }
  }

  global.window = window;

  return window;
}

module.exports = patchWindowObject;