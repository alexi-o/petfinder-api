var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DogSchema = new Schema({
     name: String,
     age: String,
     size: String,
     description: String,
     photos: {
     	photo1: String,
     	photo2: String
     },
     contact: {
		phone: String,
		address: String,
		email: String,
		city: String,
		state: String,
		zip: String
		}
});

var Dog = mongoose.model('Dog', DogSchema);

module.exports = Dog;