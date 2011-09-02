require "coffee-script"
sys = require "sys"
events = require "events"

config = require "./config2"
aggregator = require "./app.status.aggregator2"


express = require('express')
app = express.createServer()
app.set 'view engine', 'jade'

app.configure ->  
  app.use express.static __dirname + '/../public'


EventBroker = ()->
  events.EventEmitter.call(this)

sys.inherits(EventBroker, events.EventEmitter);
eventBroker = new EventBroker()

eventBroker.addListener "status-retrieval-complete", (environment, states, request, config, propertyNames) ->
  # res.render('index', {layout: false, servers: serversHealth})
  res.send("This is the dashboard")
  res.end
  
app.get '/', (req, res) ->
  serversToWatch = config.load()
  
  res.render 'index', {layout: true, locals: {config: serversToWatch}}
  res.end
  
app.get '/status/:environment', (req, res) ->

  # eventBroker.addListener("status-retrieval-complete", function(environment, states, request, config, propertyNames) {
  #       res.render('dashboard.haml', {
  #         locals: {
  #           title: 'Dashboard',
  #           environment: environment,
  #           config: config,
  #           states: states,
  #           propertyNames: propertyNames
  #         }
  #       });
  #     });

  aggregator.createStatusAggregator(config.load(), eventBroker, this).aggregate req.params.environment
  # res.send "Hello"

 
PORT = 3000
app.listen(PORT)
console.log("Starting server on port #{PORT}")