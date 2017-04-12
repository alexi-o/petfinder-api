var expect = require('chai').expect;
var request = require('request');

const api = require('../env.js');

var link = "http://api.petfinder.com/pet.getRandom?key=" +api + "&animal=dog&location=Denver+CO&output=basic&format=json";

describe("PetFinder", function(){
	it("Should receive a 200 - OK HTTP Status Code", function(done){
		request(link, function(err, response, body){
			console.log(link);
			expect(response.statusCode).to.be.eq(200);
			done();
		});
	});
	it("Should have a Name in the body", function(done){
		request(link, function(err, response, body){
			var body = JSON.parse(body);
			console.log(body.petfinder.pet.name.$t);
			expect(body.petfinder.pet.name.$t).to.not.be.empty;
			done();
		});
	});
});