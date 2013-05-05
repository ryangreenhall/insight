var Url = require('url'),
    http = require('http')
    needle = require('needle');

var basicAuth = function(auth) {
  var username = auth.split(":")[0];
  var password = auth.split(":")[1];
  return 'Basic ' + new Buffer(username + ':' + password).toString('base64');
};

var requestUrl = function(parsedUrl) {
  return parsedUrl.protocol + "//" + parsedUrl.host + parsedUrl.pathname;
};

exports.resource = function(url) {
    var that = {};
    that.get = function(success, failure) {        
      var parsedUrl = Url.parse(url, false);
      var options = {}  
      needle.get(requestUrl(parsedUrl), options, function(error, response, body) {
        if (!error) {
          success(body);
        } else {
          failure();
        }
      });
    };
    return that;
};