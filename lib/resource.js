var Url = require('url'),
    http = require('http')
    needle = require('needle');

var basicAuthFrom = function(url) {
  if (url.auth) {
    var username = url.auth.split(":")[0];
    var password = url.auth.split(":")[1];  
    return { username: username, password: password}
  } else {
    return {};
  }
};

var requestUrl = function(parsedUrl) {
  return parsedUrl.protocol + "//" + parsedUrl.host + parsedUrl.pathname;
};

exports.resource = function(url) {
    var that = {};
    that.get = function(success, failure) {        
      var parsedUrl = Url.parse(url, false);
      needle.get(requestUrl(parsedUrl), basicAuthFrom(parsedUrl), function(error, response, body) {
        if (!error && response.statusCode == 200) {
          success(body);
        } else {
          failure();
        }
      });
    };
    return that;
};