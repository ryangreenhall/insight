var insight = require('namespace'),
    Url = require('url'),
    http = require('http');

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