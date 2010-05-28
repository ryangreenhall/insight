require.paths.unshift('src');

var sys = require('sys'),
    http = require('http'),
    File = require('fs'),
    Url = require('url'),
    Events = require('events'),
    underscore = require("../lib/underscore"),
    kiwi = require('kiwi'),
    insight = require('namespace'),
    config = require('config');


kiwi.require('express');
require('express/plugins');


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


insight.resource = function(url) {
    var that = {};
    var parsedUrl = Url.parse(url, false);
    that.get = function(callback) {
        var client = http.createClient(parsedUrl.port, parsedUrl.hostname);
        var request = client.request('GET', parsedUrl.pathname, {'host': parsedUrl.hostname});
        request.addListener('response', function (response) {
            response.setEncoding('utf8');
            response.addListener('data', function (chunk) {
                callback(chunk);
            });
        });
        client.addListener('error', function (err) {
            callback("{\"isUnavailable\":\"true\"}");
        });

        request.end();
    };
    return that;
};

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
    var env = config.environments[environment];

    var states = [];
    var that = this;
    env.urls.forEach(function(url) {

        var propertyNamesFrom = function(healthyServerState) {
            var propertyNames = [];
            for (property in healthyServerState) {
                propertyNames.push(property);
            }
            return propertyNames;
        };

        insight.resource(url).get(function(data) {
            var status = JSON.parse(data);
            status.server = url;
            states.push(status);

            var healthyServerStates = states.filter(function(status){
                return !status.isUnavailable;
            });

            var propertyNames = propertyNamesFrom(healthyServerStates[0]);

            if (states.length === env.urls.length) {
                eventBroker.emit("status-retrieval-complete", environment, states, that, config, propertyNames);
            }
        });
    });
});

run();