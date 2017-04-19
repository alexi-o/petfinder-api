var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/petfinder-api");

module.exports.Dog = require('./dogs.js');

