url = require('url')
http = require('http')

class Resource
  
  constructor: (resource) ->
    @url = url.parse resource, false
  
  get: (success, failure) ->    
    port = @url.port || 80
    client = http.createClient port, @url.hostname
    client.setTimeout(8000);
    
    aUrl = @url
    
    client.on 'timeout', () ->
      failure aUrl.hostname
    
    request = client.request 'GET', @url.pathname, {'host': @url.hostname}
      
    request.on 'timeout', () ->
      console.log 'Request timed out holy moly'
      
    request.on 'response', (response) ->
      response.setEncoding 'utf8'
      response.body = ''
      
      response.on 'data', (chunk) ->
        response.body += chunk
          
      response.on 'end', () ->
        success aUrl.hostname, response.body
    
    client.on 'error', (err) ->
      failure aUrl.hostname

    request.end()


exports.createResource = (url) ->
  new Resource url
