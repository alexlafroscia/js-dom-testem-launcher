'use strict';

const request = require('request');

function fetchPageBody(url) {
  return new Promise((resolve, reject) => {
    request(url, function(error, res, body) { 
      if (error) {
        reject(error);
        return;
      }

      if (res.statusCode !== 200) {
        reject(new Error(`Server responded with status code ${res.statusCode}`));
        return;
      }

      resolve(body);
    });
  });
}

module.exports = fetchPageBody;