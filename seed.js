var db = require('./models');

db.Dog.remove({}, function(err, dogs){
	if (err){
		console.log(err);
	}
	console.log("removed dogs");
});

var dogs = [];

db.Dog.create(dogs, function(err, dogs){
	if (err) { 
	return console.log('err', err); 
	} else {
	console.log('created', dogs);
	process.exit();
}
});