var sys = require('sys'),
   http = require('http');

var insight = {};

insight.server = function() {
    var that = {};

    var server = http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Welcome to Insight');
    });

    that.start = function() {
        server.listen(8000);
        sys.puts('Server running at http://localhost:8000/');
    };

    return that;
};


insight.server().start();

