var express = require('express');
var app = express.createServer();
var config = require('./config');

app.configure(function(){
  console.log(__dirname + '/../public')
  app.use(express.staticProvider(__dirname + '/../public'));
});

app.get('/', function(req, res){
  res.render('index.haml', {
    locals: {
      title: 'Insight',
      config: config.load()
    }
  });
});

app.get('/status/:environment', function(req, res) {
  res.render('dashboard.haml', {
    locals: {
      title: 'Dashboard',
      environment: req.params.environment,
      config: config.load()
    }
  });
});

app.listen(3000);