var insight = require('namespace'),
fs = require('fs'),
sys = require('sys');

require('config');

describe('config', function(){
  it('should pass', function(){
      var config = insight.config().load();
      expect(config.environments.Prod.urls).toContain("http://localhost:8080/public/status.json");
      expect(config.environments.Prod.urls).toContain("http://localhost:8081/public/status.json");
      expect(config.environments.Prod.urls).toContain("http://localhost:8086/public/status.json");
  });
});