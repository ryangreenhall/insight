var insight = require('namespace');
require('resource');

describe("Resource", function() {

    xit("gets resource and invokes success callback when resource is valid and available", function() {

        var sys = require('sys'),
                http = require('http');

        var givenAResource = function(port) {
            http.createServer(function (request, response) {
                response.writeHead(200, {'Content-Type': 'text/plain'});
                response.end('Hello World\n');
            }).listen(port);
        };

        var success = {};

        var dataRetrieved = function() {
            return success.ok;
        };

        var successCallback = function() {
            success.ok = true;
        };

        var failureCallback = function() {
        };

        runs(function() {
            givenAResource(8000);
        });
        waits(5000);

        runs(function() {
            sys.puts("Getting the resource");
            var success = {};
            var successCallback = function() {
                sys.puts("In success callback");
                success.ok = true;
            };
            insight.resource("http://localhost:8000").get(successCallback, failureCallback);
        });
        waitsFor(5000, dataRetrieved);

        runs(function() {
            expect(success.ok).toEqual(true);
        });
    });
});