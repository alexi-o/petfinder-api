var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');
var Dog = require('./dogs.js');

var User = mongoose.Schema({
  local : {
    email        : String,
    password     : String,
    allDogs      : {type: Schema.Types, ref: "Dog"},
    hatedDogs	 : [ String ],
    lovedDogs	 : [ String ]
  }
});

User.methods.encrypt = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

User.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', User);