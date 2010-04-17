var sys = require('sys'),
        http = require('http'),
        Haml = require('../lib/haml'),
        File = require('fs');

var insight = {};

insight.server = function() {
    var that = {};

    var renderWelcomePageTo = function(response) {
        File.readFile('../../templates/index.haml', "UTF-8", function (err, haml) {
            var data = {
                title: "Insight",
                contents: "<h1>Welcome to Insight</h1>"
            };
            page = Haml.render(haml, {locals: data});
            response.end(page);
        });
    };

    var server = http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        renderWelcomePageTo(res);
    });

    that.start = function() {
        server.listen(8000);
        sys.puts('Server running at http://localhost:8000/');
    };

    return that;
};


insight.server().start();

