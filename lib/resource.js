var Url = require('url'),
    http = require('http');
    
// var request = require('request');
// request('http://www.google.com', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body) // Print the google web page.
//   }
// })

// request.auth('username', 'password', false).get('http://some.server.com/');
// // or
// request.get('http://some.server.com/', {
//   'auth': {
//     'user': 'username',
//     'pass': 'password',
//     'sendImmediately': false
//   }
// });

// var username = 'Test';
// var password = '123';
// var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
// 
// // auth is: 'Basic VGVzdDoxMjM='
// 
// var header = {'Host': 'www.example.com', 'Authorization': auth};
// var request = client.request('GET', '/', header);

var header = function(url) {
  if (url.auth) { 
    return {'host': url.hostname}
  } else {
    return {'host': url.hostname}
  }
};

exports.resource = function(url) {
    var that = {};
    var parsedUrl = Url.parse(url, false);
    
    console.log("Auth: " + parsedUrl.auth);
    
    // parsedUrl.auth => "rev:password"
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