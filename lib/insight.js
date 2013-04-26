var express = require('express'),
    app = express(),
    config = require('./config'),
    events = require('events'),
    sys = require('sys');
    statusAggregator = require('./app.status.aggregator');

app.configure(function(){
  app.set("views", __dirname + "/../views");
  app.set("view engine", "jade");
  
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  
  app.use(express.static(__dirname + "/../public"));
});

function EventBroker() {
  events.EventEmitter.call(this);
}

sys.inherits(EventBroker, events.EventEmitter);
var eventBroker = new EventBroker();

app.get('/', function(req, res){
  res.render('index', {});
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

var PORT = 3000;
app.listen(PORT);
console.log("Insight is runnning at: http://localhost:" + PORT)