'use strict';

const METHODS = [
  'scrollTo',
  'focus'
];
const NO_OP = function() {
  // No op
};

// Patch methods that JSDOM throws an error on
function patchNoOpMethods(window) {
  for (const method of METHODS) {
    window[method] = NO_OP;
  }
  
  return window;
}

module.exports = patchNoOpMethods;