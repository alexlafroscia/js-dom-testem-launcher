'use strict';

function patchStorageAPI(window) {
  // Mock out the storage APIs
  window.localStorage = window.sessionStorage = {
    getItem(key) {
      return this[key];
    },
    setItem(key, value) {
      this[key] = value;
    },
    removeItem(key) {
      delete this[key];
    },
    clear() {
      for (const key of Object.keys(this)) {
        if (['getItem', 'setItem', 'removeItem', 'clear'].includes(key)) {
          continue;
        }

        this.removeItem(key);
      }
    }
  };

  return window;
}

module.exports = patchStorageAPI;