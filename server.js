var express = require('express'),
    app = express();

var state = "CO";
var city = "Denver";
var animal = "dog";

const api = require('./env.js');

app.use(express.static('public'));

var link = "http://api.petfinder.com/pet.find?key=" +api + "&animal=" +animal +"&location="+city + "+" +state +"&output=basic"

// Routes


// Endpoints
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});


// Server
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});