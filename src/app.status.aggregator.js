var insight = require('namespace'),
    resource = require('resource');

insight.appStatusAggregator = function(config, eventBroker, request){
    var that = {};

    that.aggregate = function(environment) {

        var propertyNamesFrom = function(healthyServerState) {
            var propertyNames = [];
            for (property in healthyServerState) {
                propertyNames.push(property);
            }
            return propertyNames;
        };

        var allServerStatesHaveBeenRetrieved = function() {
            return states.length === env.urls.length;
        };

        var propertyNames = function() {
            var healthyServerStates = states.filter(function(status){
                return !status.isUnavailable;
            });
            return propertyNamesFrom(healthyServerStates[0]);
        };

        var env = config.environments[environment];
        var states = [];
        env.urls.forEach(function(url) {
            insight.resource(url).get(function(data) {
                var status = JSON.parse(data);
                status.server = url;
                states.push(status);

                if (allServerStatesHaveBeenRetrieved()) {
                    eventBroker.emit("status-retrieval-complete", environment, states, request, config, propertyNames());
                }
            }, function() {
                var status = {
                    isUnavailable:true,
                    server:url
                };
                states.push(status);
            });
        });

    };
    return that;
};