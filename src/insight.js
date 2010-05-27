var insight = {};

var sys = require('sys'),
        http = require('http'),
        File = require('fs'),
        Url = require('url'),
        Events = require('events'),
        underscore = require("../lib/underscore");


var kiwi = require('kiwi');
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

eventBroker.addListener("status-retrieval-complete", function(environment, states, request){
    return request.render('dashboard.html.haml', {
        layout: false,
        locals: {
            title: environment + ' Dashboard',
            environment: environment,
            states: states
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
        request.end();
    };
    return that;
};

get('/', function() {
    return this.render('index.html.haml', {
        layout: false,
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
        insight.resource(url).get(function(data) {
            states.push(JSON.parse(data));
            if (states.length === env.urls.length) {
                eventBroker.emit("status-retrieval-complete", environment, states, that);
            }
        });
    });
});

get('/*.css', function(file){
  var toRead = __dirname + '/' + file + '.css';
  return File.readFileSync(toRead);
});

insight.config = function() {
    var that = {};
    var config;

    that.load = function() {
        config = JSON.parse(File.readFileSync('config/config.json'));
        return config;
    };

    return that;
};


run();