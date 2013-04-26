var express = require('express'),
    app = express(),
    config = require('./lib/config'),
    events = require('events'),
    sys = require('sys');
    statusAggregator = require('./lib/app.status.aggregator');

var app = module.exports = express();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Insight',
    config: config
  });
});

if (!module.parent) {
  PORT = 3000;
  app.listen(PORT);
  console.log("Insight running on port %d", PORT);
}