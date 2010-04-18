var sys = require('sys'),
        http = require('http'),
        File = require('fs'),
        Haml = require('../lib/haml');


var insight = {};

insight.server = function() {
    var that = {};
    var config = insight.config().load();

    var renderWelcomePageTo = function(response) {
        File.readFile('templates/index.haml', "UTF-8", function (err, haml) {
            var data = {
                title: "Insight",
                contents: "<h1>Welcome to Insight</h1>",
                config: config
            };
            var page = Haml.render(haml, {locals: data});
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

insight.config = function() {
    var that = {};
    var config;

    that.load = function() {
        config = eval(File.readFileSync('config/config.json'));

        sys.puts("Name of first environment: " + config[0].name);
        return config;
    };

    return that;
};


insight.server().start();

