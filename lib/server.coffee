require("coffee-script")

express = require('express')
app = express.createServer()
app.set 'view engine', 'jade'

app.get '/', (req, res) ->
  res.render 'index', {layout: false}
  res.end
 
PORT = 3000
app.listen(PORT)
console.log("Starting server on port #{PORT}")