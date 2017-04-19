var express = require('express'),
    app = express();

var bodyParser = require('body-parser');
var requestProxy = require('express-request-proxy');
var http = require("http");
var request = require('request');
var petfinder = require('petfinder')(url, 'api_secret');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

var state = "CO";
var city = "Denver";
var animal = "dog";

/************
 * DATABASE *
 ************/
var db = require('./models');
var api = require('./env.js');
var url = "http://api.petfinder.com/pet.find?key=" + api + "&animal=" +animal +"&location="+city + "+" +state +"&output=basic&format=json";

/**********
 * ENDPOINTS *
 **********/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

app.get('/api/dogs', function(req,res) {
		request(url, function(error, response, dogs) {
		var parsedDogs = JSON.parse(dogs);
		res.send(parsedDogs.petfinder.pets.pet);
	});
});


// Server
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});