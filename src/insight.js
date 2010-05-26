var insight = {};

var sys = require('sys'),
        http = require('http'),
        File = require('fs'),
        Url = require('url'),
        underscore = require("../lib/underscore");


var kiwi = require('kiwi');
kiwi.require('express');

configure(function() {
    set('root', __dirname);
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

    var status = [];
    env.urls.forEach(function(url) {
        insight.resource(url).get(function(data) {
            sys.puts("This is the data I have: " + data);
        });
    });

    // write the contents.
    return "status of " + environment;
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