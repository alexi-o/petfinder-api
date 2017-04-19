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

var secondOptions = [
{
     option: "Age",
     choices: { 1: "Baby", 2: "Young", 3: "Adult" },
},
{
     option: "Size",
     choices: { 1: "S", 2: "M", 3: "L", 4: "XL" },
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