require.paths.unshift('src');

var sys = require('sys'),
    Events = require('events'),
    underscore = require("../lib/underscore"),
    insight = require('namespace'),
    config = require('config'),
    resource = require('resource'),
    statusAggregator = require('app.status.aggregator');


require('../lib/express');
require('../lib/express/plugins');

configure(function() {
    use(Static);
    set('root', __dirname);
});


function EventBroker() {
    Events.EventEmitter.call(this);
}
sys.inherits(EventBroker, Events.EventEmitter);

var eventBroker = new EventBroker();

eventBroker.addListener("status-retrieval-complete", function(environment, states, request, config, propertyNames) {
    return request.render('dashboard.html.haml', {
        locals: {
            title: environment + ' Dashboard',
            environment: environment,
            states: states,
            config: config,
            propertyNames: propertyNames
        }
    });
});

get('/', function() {
    return this.render('index.html.haml', {
        locals: {
            title: 'Insight',
            config: insight.config().load()
        }
    });
});

get('/status/:environment', function(environment) {
    var config = insight.config().load();
    insight.appStatusAggregator(config, eventBroker, this).aggregate(environment);
});

run();