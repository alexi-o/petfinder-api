var mongoose = require("mongoose");

mongoose.connect( process.env.MONGODB_URI || 
                  process.env.MONGOLAB_URI || 
                  process.env.MONGOHQ_URL || 
                  "mongodb://localhost/petfinder-api");

module.exports.Dog = require('./dogs.js');
module.exports.User = require('./users.js');

