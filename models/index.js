var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/petfinder-api");

module.exports.Dog = require('./dogs.js');
module.exports.User = require('./users.js');

