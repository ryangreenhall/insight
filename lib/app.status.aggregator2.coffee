resource = require('./resource2')

class StatusAggregator
  # should really only be passed a list of servers
  constructor: (@config, @eventBroker, @request) ->
    
  aggregate: (environment) ->
    environment_config = @config.environments[environment]
    
    serverStates = []
    
    allServerStatesHaveBeenRetrieved = () ->
      serverStates.length is environment_config.urls.length
      
    success = (url, data) ->
      status = JSON.parse(data)
      status.server = {value: url}
      serverStates.push status
      
      @eventBroker.emit "status-retrieval-complete", environment, serverStates, @request, @config, [] if allServerStatesHaveBeenRetrieved()
      
      
    failure = (url) ->
      console.log "There was a failure"
      status = 
        isUnavailable:true,
        server:url
      serverStates.push status

      #                 states.push(status);
      # 
      #                 if (allServerStatesHaveBeenRetrieved()) {
      #                     eventBroker.emit("status-retrieval-complete", environment, states, request, config, propertyNames());
      #                 }
      #             };
    
    
    resource.createResource(server).get(success, failure) for server in environment_config.urls
      
        
exports.createStatusAggregator = (config, eventBroker, request)->
  new StatusAggregator(config, eventBroker, request)
  
# exports.appStatusAggregator = function(config, eventBroker, request) {
#     var that = {};
# 
#     that.aggregate = function(environment) {
# 
#         var propertyNamesFrom = function(healthyServerState) {
#             var propertyNames = [];
#             for (property in healthyServerState) {
#                 propertyNames.push(property);
#             }
#             return propertyNames;
#         };
# 
#         var allServerStatesHaveBeenRetrieved = function() {
#             return states.length === env.urls.length;
#         };
# 
#         var propertyNames = function() {
#             var healthyServerStates = states.filter(function(status){
#                 return !status.isUnavailable;
#             });
#             return propertyNamesFrom(healthyServerStates[0]);
#         };
# 
#         var env = config.environments[environment];
#         var states = [];
#         env.urls.forEach(function(url) {
#             var statusRetrievedSuccessfully = function(data) {
#                 var status = JSON.parse(data);
# 
#                 status.server = {value: url}
#                 states.push(status);
# 
#                 if (allServerStatesHaveBeenRetrieved()) {
#                     eventBroker.emit("status-retrieval-complete", environment, states, request, config, propertyNames());
#                 }
#             };
# 
#             var errorRetrievingStatus = function() {
#                 var status = {
#                     isUnavailable:true,
#                     server:url
#                 };
#                 states.push(status);
#             };
# 
#             resource.resource(url).get(statusRetrievedSuccessfully, errorRetrievingStatus);
#         });
# 
#     };
#     return that;
# };