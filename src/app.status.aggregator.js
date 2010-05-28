var insight = require('namespace'),
    resource = require('resource');

insight.appStatusAggregator = function(config, eventBroker, request){
    var that = {};

    that.aggregate = function(environment) {

        var env = config.environments[environment];

        var states = [];
      
        env.urls.forEach(function(url) {

            var propertyNamesFrom = function(healthyServerState) {
                var propertyNames = [];
                for (property in healthyServerState) {
                    propertyNames.push(property);
                }
                return propertyNames;
            };

            insight.resource(url).get(function(data) {
                var status = JSON.parse(data);
                status.server = url;
                states.push(status);

                var healthyServerStates = states.filter(function(status){
                    return !status.isUnavailable;
                });

                var propertyNames = propertyNamesFrom(healthyServerStates[0]);

                if (states.length === env.urls.length) {
                    eventBroker.emit("status-retrieval-complete", environment, states, request, config, propertyNames);
                }
            }, function() {
                var status = {isUnavailable:true};
                states.push(status);
            });
        });

    };
    return that;
};