var sys = require('sys'),
        http = require('http'),
        File = require('fs');

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