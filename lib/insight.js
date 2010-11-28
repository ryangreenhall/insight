var app = require('express').createServer();
var config = require('./config')

app.get('/', function(req, res){
  res.render('index.haml', {
    locals: {
      title: 'Insight',
      config: config.load()
    }
  });
});

app.listen(3000);