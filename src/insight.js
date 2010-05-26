var sys = require('sys'),
        http = require('http'),
        File = require('fs'),
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

    _.each(env.urls, function(url){

        // request the url and parse the JSON.
        sys.puts(url);
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