var express = require('express'),
    app = express.createServer(),
    config = require('./config'),
    events = require('events'),
    sys = require('sys');
    statusAggregator = require('./app.status.aggregator');

app.configure(function(){
  app.use(express.staticProvider(__dirname + '/../public'));
});

function EventBroker() {
  events.EventEmitter.call(this);
}

sys.inherits(EventBroker, events.EventEmitter);
var eventBroker = new EventBroker();

app.get('/', function(req, res){
  res.render('index.haml', {
    locals: {
      title: 'Insight',
      config: config.load()
    }
  });
});

app.get('/status/:environment', function(req, res) {
  
  eventBroker.addListener("status-retrieval-complete", function(environment, states, request, config, propertyNames) {
    res.render('dashboard.haml', {
      locals: {
        title: 'Dashboard',
        environment: environment,
        config: config,
        states: states,
        propertyNames: propertyNames
      }
    });
  });
  
  statusAggregator.appStatusAggregator(config.load(), eventBroker, this).aggregate(req.params.environment);  
});

app.listen(3000);