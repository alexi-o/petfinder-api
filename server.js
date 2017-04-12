var express = require('express'),
    app = express();

var state = "CO";
var city = "Denver";
var animal = "dog";

const api = require('./env.js');

var link = "http://api.petfinder.com/pet.find?key=" +api + "&animal=" +animal +"&location="+city + "+" +state +"&output=basic"

// Routes


// Endpoints
app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// Server
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});