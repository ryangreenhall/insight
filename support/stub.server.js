var express = require('../vendor/express');
var fs = require('fs')

var app = function(port, status_path) {
  var that = {};
  
  var app = express.createServer();

  app.configure(function(){
    app.use(express.staticProvider(__dirname + '/public'));
  });
  
  that.start = function() {
    app.listen(port)
  }
  
  return that;
}

var ports = [8080, 8081, 8082];
ports.forEach(function(port) {
  app(port).start();
})

// 
