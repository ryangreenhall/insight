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