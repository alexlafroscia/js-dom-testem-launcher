'use strict';

const jsdom = require('jsdom');
const stripIndent = require('common-tags').stripIndent;
const patchWindowObject = require('./patch-window-object');

var virtualConsole = jsdom.createVirtualConsole();
virtualConsole.on('jsdomError', function (error) {
  debugger;

  if (error.message.includes("HTMLFormElement.prototype.submit")) {
    // no-op because I don't know how else to be quiet about this issue
    return;
  }

  console.error(error.stack, error.detail);
});
virtualConsole.on('error', function(error) {
  console.error(error.stack, error.detail);
});

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