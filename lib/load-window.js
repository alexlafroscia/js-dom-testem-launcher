'use strict';

const jsdom = require('jsdom');

var virtualConsole = jsdom.createVirtualConsole();
virtualConsole.on('jsdomError', function (error) {
  console.error(error.stack, error.detail);
});

function loadWindow(body, url) {
  const doc = jsdom.jsdom(body, {
    url,
    virtualConsole,
    features: {
      MutationEvents: '2.0'
    }
  });

  return document.defaultView;
}

module.exports = loadWindow;