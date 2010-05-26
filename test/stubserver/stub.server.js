var kiwi = require('kiwi'),
fs = require('fs'),
sys = require('sys');

kiwi.require('express'),

configure(function() {
  set('root', __dirname);
});


get('/*.json', function(file) {
  var toRead = __dirname + '/' + file + '.json';
  return fs.readFileSync(toRead);
});

run(8080);
run(8081);
run(8082);