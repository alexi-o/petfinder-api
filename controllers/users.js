var passport = require("passport")
var db = require('../models');

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

function allDogs(req, res) {
	db.Dog.find({}, function (err, data){
		console.log(data);
		console.log(req.user + "Love Dogs");
		res.send(data);
	});
}

function oneDog(req, res) {
	db.Dog.findByIdAndremove({_id: req.paramas.id}, function(err, dogs){
		if(err) res.json(err);
		console.log("Removed " + req.params.id);
		res.send(dogs);
	});
}

function deleteDog(req, res) {
	db.Dog.findByIdAndRemove({_id: req.params.id}, function(err, dogs) {
		if(err) res.json(err);
		console.log("Removed " + req.params.id);
		res.send(dogs);
	});
}

module.exports = {	
  allDogs: allDogs,
  deleteDog: deleteDog,	
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  secret: secret
};