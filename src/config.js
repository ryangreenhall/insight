var insight = require('namespace'),
    file = require('fs');

insight.config = function() {
    var that = {};
    var config;

    that.load = function() {
        config = JSON.parse(file.readFileSync('config/config.json'));
        return config;
    };

    return that;
};