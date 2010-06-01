var insight = require('namespace'),
fs = require('fs'),
sys = require('sys');

require('config');

describe('config', function(){

    it('can be loaded from file', function(){
        var config = insight.config().load();
        expect(config.environments.Prod.urls).toEqual(
                ['http://localhost:8080/public/status.json',
                 'http://localhost:8081/public/status.json',
                 'http://localhost:8086/public/status.json']);
    });

    it("contains three environments", function(){
        var config = insight.config().load();

        var envs = [];
        for (environment in config.environments) {
            envs.push(environment);
        }
        expect(envs).toEqual(["Staging", "Showcase", "Prod"]);
    });
});