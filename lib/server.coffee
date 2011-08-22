require("coffee-script")

express = require('express')
app = express.createServer()

app.get '/', (req, res) ->
  res.send("Welcome to insight")
 
PORT = 3000
app.listen(PORT)
console.log("Starting server on port #{PORT}")