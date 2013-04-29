var express = require('express'),
    app = express(),
    config = require('./lib/config'),
    events = require('events'),
    sys = require('sys');
    statusAggregator = require('./lib/app.status.aggregator');
    
DEFAULT_CONFIG_PATH = "config/config.json";

exports.start = function(port, configPath) {
  var thePort = port || 3000;
  var theConfigPath = configPath || DEFAULT_CONFIG_PATH;
  
  console.log("Insight running on port %d", thePort);
  
  var app = express();

  var environments = config.load(theConfigPath).environments;
  
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

  function EventBroker() {
    events.EventEmitter.call(this);
  }

  sys.inherits(EventBroker, events.EventEmitter);
  var eventBroker = new EventBroker();

  app.get('/', function(req, res){
    res.render('index', {
      title: 'Insight',
      environments: environments
    });
  });

  app.get('/status/:environment', function(req, res) {

    eventBroker.addListener("status-retrieval-complete", function(environment, states, request, config, propertyNames) {
      res.render('dashboard', {
        title: 'Dashboard',
        environments: environments,
        environment: environment,
        config: config,
        states: states,
        propertyNames: propertyNames
      });
    });

    statusAggregator.appStatusAggregator(config.load(theConfigPath), eventBroker, this).aggregate(req.params.environment);  
  });
  
  app.listen(thePort);
};




