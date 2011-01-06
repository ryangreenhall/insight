var Url = require('url'),
    http = require('http');

exports.resource = function(url) {
    var that = {};
    var parsedUrl = Url.parse(url, false);
    that.get = function(successCallback, failureCallback) {
        var port = parsedUrl.port || 80;
        var client = http.createClient(port, parsedUrl.hostname);
        var request = client.request('GET', parsedUrl.pathname, {'host': parsedUrl.hostname});
        
        request.on('response', function (response) {
            response.setEncoding('utf8');
            response.body = ''
            response.on('data', function (chunk) {
                response.body += chunk; 
            });
            response.on('end', function(){
              successCallback(response.body);
            });
        });
        
        client.on('error', function (err) {
            failureCallback();
        });

        request.end();
    };
    return that;
};