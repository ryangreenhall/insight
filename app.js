var express = require('express'),
    app = express(),
    config = require('./lib/config'),
    events = require('events'),
    sys = require('sys');
    statusAggregator = require('./lib/app.status.aggregator');

var app = module.exports = express();

var environments = config.load().environments;

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


app.get('/', function(req, res){
  res.render('index', {
    title: 'Insight',
    environments: environments
  });
});

if (!module.parent) {
  PORT = 3000;
  app.listen(PORT);
  console.log("Insight running on port %d", PORT);
}