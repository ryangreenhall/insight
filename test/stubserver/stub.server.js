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

var ports = [8080, 8081, 8082];
ports.each(function(port){
    run(port);
});
