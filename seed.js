var express = require('express'),
    app = express();

var request	   = require('request');
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var db  	   = require('./models');

var url = "http://api.petfinder.com/pet.find?key=925c6202c203f971efa10681383dd089&animal=dog&location=colorado&output=basic&count=200&format=json";

var dogsList = [];

request(url, function(error, response, body){
	console.log(url);
	var dogList = [];
	var parsedDogs = JSON.parse(body);
			console.log(parsedDogs.petfinder.pets.pet);
				console.log(body);
				parsedDogs.petfinder.pets.pet.forEach(function(dog){
					dogObj = {
					name: dog.name.$t,
					age: dog.age.$t,
					size: dog.size.$t,
					description: dog.description.$t,
					photos: {
						photo1: dog.media.photos.photo[1].$t,
						photo2: dog.media.photos.photo[2].$t
					},	 
					contact: {
						phone: dog.contact.phone.$t,
						address: dog.contact.address1.$t,	
						email: dog.contact.email.$t,
						city: dog.contact.city.$t,
						state: dog.contact.state.$t,
						zip: dog.contact.zip.$t
						},
					};
					dogList.push(dogObj);
				});

		db.Dog.remove({}, function(err, dogs){
		
		if (err) {
			console.log('error occurred in remove', err);
		} else {
			console.log('removed all dogs');
		}
	});
		//create new records based on dog array
		db.Dog.create(dogList, function(err, dogs){
			if (err) { return console.log('err', err); }
			console.log("created", dogList.length, "dogs");
			process.exit();
		});
});
