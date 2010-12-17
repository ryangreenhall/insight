var Url = require('url'),
    http = require('http');

exports.resource = function(url) {
    var that = {};
    var parsedUrl = Url.parse(url, false);
    that.get = function(successCallback, failureCallback) {
        var port = parsedUrl.port || 80;
        var client = http.createClient(port, parsedUrl.hostname);
        var request = client.request('GET', parsedUrl.pathname, {'host': parsedUrl.hostname});
        
        request.addListener('response', function (response) {
            response.setEncoding('utf8');
            response.addListener('data', function (chunk) {
                successCallback(chunk);
            });
        });
        client.addListener('error', function (err) {
            failureCallback();
        });

        request.end();
    };
    return that;
};