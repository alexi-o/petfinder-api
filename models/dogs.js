var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DogSchema = new Schema({
     name: String,
     age: String,
     size: String,
     description: String
});

var Dog = mongoose.model('Dog', DogSchema);

module.exports = Dog;