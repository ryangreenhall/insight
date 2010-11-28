var fs = require('fs');

exports.load = function() {
  return JSON.parse(fs.readFileSync('config/config.json'));
};