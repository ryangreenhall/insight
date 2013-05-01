var Url = require('url'),
    http = require('http');

var basicAuth = function(auth) {
  var username = auth.split(":")[0];
  var password = auth.split(":")[1];
  return 'Basic ' + new Buffer(username + ':' + password).toString('base64');
};

var header = function(url) {
  if (url.auth) { 
    return {'host': url.hostname, 'Authorization': basicAuth(url.auth)}
  } else {
    return {'host': url.hostname}
  }
};

exports.resource = function(url) {
    var that = {};
    var parsedUrl = Url.parse(url, false);
    
    that.get = function(successCallback, failureCallback) {
        var port = parsedUrl.port || 80;
        var client = http.createClient(port, parsedUrl.hostname);
        var request = client.request('GET', parsedUrl.pathname, header(parsedUrl));
        
        request.on('response', function (response) {
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