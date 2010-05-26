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
    that.get = function() {
        sys.puts("GET: " + url);
    };
    return that;
};

get('/', function(){
  return this.render('index.html.haml', {
                      layout: false,
                        locals: {
                          title: 'Insight',
                          config: insight.config().load()
                        }
                    });
});

get('/status/:environment', function(environment) {
    // load the configuration for the given environment
    var config = insight.config().load();
    var env = config.environments[environment];

    var requestStatus = function(url) {
        insight.resource(url).get(); 

        var url = Url.parse(url, false);
      
        var google = http.createClient(url.port, url.hostname);
        var request = google.request('GET', url.pathname,
          {'host': url.hostname});

        var statusAsJson = {};
        request.addListener('response', function (response) {
          response.setEncoding('utf8');
          response.addListener('data', function (chunk) {
            statusAsJson.status = chunk;
            sys.puts('BODY: ' + chunk);
            sys.puts('More body' + statusAsJson.status);
          });
        });
        request.end();
        return statusAsJson.status;
    };


    _.each(env.urls, function(url){

        // request the url and parse the JSON.
        var statusAsJson = requestStatus(url);
        sys.puts(statusAsJson);

    });
    
    

    // request the status page for each

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