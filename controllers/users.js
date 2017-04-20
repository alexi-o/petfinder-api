var passport = require("passport")

// var api = require('../env.js');
// var api2 = require('../env2.js');

// function getDogs(request, response) {
// 		var url = "http://api.petfinder.com/pet.find?key=" + api + "&animal=dog&location=colorado&output=basic&count=5&format=json";
// 		request(url, function(error, response, dogs) {
// 		var parsedDogs = JSON.parse(dogs);
// 		res.send(parsedDogs.petfinder.pets.pet);
// 	});
// }

// GET /signup
function getSignup(request, response) {
	response.render('signup.ejs', 
		{message: request.flash('signupMessage') }
	);
}

// POST /signup
function postSignup(request, response, next) {
	var signupStrategy = passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	});

	return signupStrategy(request, response, next);
}

// GET /login
function getLogin(request, response, next) {
	response.render('login.ejs', { message: request.flash('loginMessage')}); 
}

// POST /login 
function postLogin(request, response, next) {
	var loginStrategy = passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	});

	return loginStrategy(request, response, next);
}

// GET /logout
function getLogout(request, response) {
	request.logout();
	response.redirect('/');
}

// Restricted page
function secret(request, response){
	response.json("HELP");
}

module.exports = {
  // getDogs: getDogs,	
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  secret: secret
};