var express = require('express'),
    app = express();

var bodyParser   = require('body-parser');
var request		 = require('request');
var mongoose     = require('mongoose');
var passport     = require('passport');
var flash        = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

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
	// app.get('/', function (req, res) {
	//   res.sendFile('views/index.html' , { root : __dirname});
	// });

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