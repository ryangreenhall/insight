require("coffee-script")

config = require "./config2"


express = require('express')
app = express.createServer()
app.set 'view engine', 'jade'

app.configure ->  
  app.use express.static __dirname + '/../public'

app.get '/', (req, res) ->
  serversToWatch = config.load()
  
  res.render 'index', {layout: true, locals: {config: serversToWatch}}
  res.end
 
PORT = 3000
app.listen(PORT)
console.log("Starting server on port #{PORT}")