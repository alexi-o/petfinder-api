var express = require('express'),
    app = express();

var api = require('./env.js');
var api2 = require('./env2.js');
var url = "http://api.petfinder.com/pet.find?key=" + api + "&animal=dog&location=colorado&output=basic&count=5&format=json";


var bodyParser   	 = require('body-parser');
var request		 	 = require('request');
var mongoose     	 = require('mongoose');
var passport     	 = require('passport');
var flash        	 = require('connect-flash');
var morgan       	 = require('morgan');
var cookieParser 	 = require('cookie-parser');
var session      	 = require('express-session');
var googleMapsClient = require('@google/maps').createClient({
  key: api2
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev')); 
app.use(cookieParser());

app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS' })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());

require('./config/passport')(passport);
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
  });

var routes = require('./config/routes');
app.use(routes);

/************
 * DATABASE *
 ************/
var db = require('./models');
/**********
 * ENDPOINTS *
 **********/

app.get('/api/dogs', function(req,res) {
		var url = "http://api.petfinder.com/pet.find?key=" + api + "&animal=dog&location=colorado&output=basic&count=5&format=json";
		request(url, function(error, response, dogs) {
		var parsedDogs = JSON.parse(dogs);
		res.send(parsedDogs.petfinder.pets.pet);
	});
});

app.get('/api/dogs/:search', function(req, res) {
		console.log("This is the request: " + req.params.search);
		var location = req.params.search;
		console.log("Location: " + location);
		var url = "http://api.petfinder.com/pet.find?key=" + api + "&animal=dog&location="+location+"+CO" +"&output=basic&count=5&format=json";
		console.log(url);
		request(url, function(error, response, dogs) {
			var parsedDogs = JSON.parse(dogs);
			console.log(parsedDogs.petfinder.pets.pet);
			res.send(parsedDogs.petfinder.pets.pet);
	});	
});

app.get('/api/dogs/:id', function(req,res) {
		var id = req.params.id;
		console.log("this id: " +id);
		var url = "http://api.petfinder.com/pet.get?key=" + api + "&id=" +id +"&output=basic&format=json";
		console.log(url);
		request(url, function(error,response,dog) {
			var parsedDog = JSON.parse(dog);
			console.log(parsedDog);
			res.send(parsedDog.petfinder.pet);
		});
});


// Server
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});