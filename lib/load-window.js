'use strict';

const jsdom = require('jsdom');
const patchWindowObject = require('./patch-window-object');

var virtualConsole = jsdom.createVirtualConsole();
virtualConsole.on('jsdomError', (error) => console.error(error.stack, error.detail));
virtualConsole.on('error', (error) => console.error(error.stack, error.detail));
virtualConsole.on('log', (message) => process.stderr.write(`log: ${message}`));

function loadWindow(body, url) {
  const doc = jsdom.jsdom(body, {
    url,
    virtualConsole,
    features: {
      FetchExternalResources : ["script"],
      MutationEvents: '2.0'
    }
  });

  return patchWindowObject(doc.defaultView);
}

module.exports = loadWindow;