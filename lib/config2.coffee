fs = require('fs');

exports.load = ()-> 
  JSON.parse fs.readFileSync 'config/config.json'
