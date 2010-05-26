var sys = require('sys'),
        http = require('http'),
        File = require('fs'),
        Url = require('url'),
        underscore = require("../lib/underscore");


var insight = {};

var kiwi = require('kiwi');
kiwi.require('express');

configure(function() {
  set('root', __dirname);
});

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

        var url = Url.parse(url, false);
        sys.puts("Host:" + url.hostname);
        sys.puts("Port:" + url.port);
        sys.puts("Path:" + url.pathname);


        var google = http.createClient(url.port, url.hostname);
        var request = google.request('GET', url.pathname,
          {'host': url.hostname});

        var statusAsJson = {};
        request.addListener('response', function (response) {
          response.setEncoding('utf8');
          response.addListener('data', function (chunk) {
            statusAsJson = chunk;
//            sys.puts('BODY: ' + chunk);
          });
        });
        request.end();
        return statusAsJson;
    };


    _.each(env.urls, function(url){

        // request the url and parse the JSON.
        sys.puts(url);
        requestStatus(url);
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