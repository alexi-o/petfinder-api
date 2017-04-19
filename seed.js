var db = require('./models');

db.Dog.remove({}, function(err, dogs){
	if (err){
		console.log(err);
	}
	console.log("removed dogs");
});

var dogs = [
{
     name: "Doggo 1",
     age: "Young",
     size: "Small",
     description: "Just a great doggo" 
},
{
     name: "Doggo 2",
     age: "Young",
     size: "Small",
     description: "Just a great doggo" 
},
{
     name: "Doggo 3",
     age: "Young",
     size: "Small",
     description: "Just a great doggo" 
}	
];

db.Dog.create(dogs, function(err, dogs){
	if (err) { 
	return console.log('err', err); 
	} else {
	console.log('created', dogs);
	process.exit();
}
});