'use strict';

const jsdom = require('jsdom');
const stripIndent = require('common-tags').stripIndent;

var virtualConsole = jsdom.createVirtualConsole();
virtualConsole.on('jsdomError', function (error) {
  console.error(error.stack, error.detail);
});
virtualConsole.on('log', function (message) {
  process.stderr.write(`log: ${message}`)
});

function loadWindow(body, url) {
  const doc = jsdom.jsdom(body, {
    url,
    virtualConsole,
    features: {
      MutationEvents: '2.0'
    }
  });

  const window = doc.defaultView;

  // Overrides
  window.scrollTo = function() {
    // no-op, because Testem will access it and JSDOM throws an error
  }

  return window;
}

module.exports = loadWindow;