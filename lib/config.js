var fs = require('fs');

exports.load = function(filepath) {
  return JSON.parse(fs.readFileSync(filepath));
};