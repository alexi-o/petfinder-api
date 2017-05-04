var db = require('../models');
//Pulls all of the dogs (200 count limit) in the DB
function allDogs(req, res, next) {
	db.Dog.find({}, function (err, data){
		console.log(data);
		console.log(req.user + "Love Dogs");
		res.send(data);
		var userId = req.user._id;
		db.User.find({_id: userId}, function(err, user){
			console.log(user + "   DOGS");
			console.log(user.allDogs);
		});
	});
}

function oneDog(req, res, next) {
	db.Dog.findByIdAndremove({_id: req.paramas.id}, function(err, dogs){
		if(err) res.json(err);
		console.log("Removed " + req.params.id);
		res.send(dogs);
	});
}
//Finds dog by ID and removes them on Hate This Dog click
function deleteDog(req, res, next) {
	db.Dog.findByIdAndRemove({_id: req.params.id}, function(err, dogs) {
		if(err) res.json(err);
		console.log("Removed " + req.params.id);
		res.send(dogs);
	});
}

function searchDog(req,res, next) {
	console.log(req.params);
	db.Dog.find({age: req.params.age }, function(err, dogs) {
		if(err) res.json(err);
		console.log("Searching for dogs: " + req.params.city);
	});
}

module.exports = {
	allDogs: allDogs,
	oneDog: oneDog,
	deleteDog:deleteDog,
	searchDog: searchDog
};