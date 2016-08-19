var should = require('chai').should();
 expect = require('chai').expect,
 supertest = require("supertest"),
 api = supertest.agent('http://localhost:3000');
var mocha = require('mocha');

//module.exports = api;

describe('Address Details', function(){
	
	it('Should return a 200 response', function(done){
		api.get('/user/1')
		.set('Accept', '/json/')
		.expect(200,done)
		.end(function(err,res){
			console.log("API endpoint responding");
		});
		done();
      				
	});
	it('Creating object structure', function(done){
		api.get('/user/1')
		.set('Accept','/json/')
		.expect(200,done)
		.end(function(err, res){
			expect(res.body).to.have.property("addressType");
			expect(res.body.addressType).to.not.equal(null);
			expect(res.body).to.have.property("buildingName");
			expect(res.body.buidlingName).to.not.equal(null);
			expect(res.body).to.have.property("floorNo.");
			expect(res.body.floorNo).to.not.equal(null);
			expect(res.body).to.have.property("streetName");
			expect(res.body.streetName).to.not.equal(null);
			expect(res.body).to.have.property("city");
			expect(res.body.city).to.not.equal(null);
			expect(res.body).to.have.property("zip");
			expect(res.body.zip).to.not.equal(null);
			expect(res.body).to.have.property("country");
			expect(res.body.country).to.not.equal(null);
			});
			done();
	});
	
	it('Should insert a new record',function(done){
		
		api.put('/user/1')
		.set('Accept','/x-www-form-urlencoded/')
		.expect(200,done)
		.end(function(err, res){
			expect(res.body.addressType).to.equal("residential");
			expect(res.body.buildingname).to.equal("windsor palace");
			expect(res.body.floorNo).to.equal("5");
			expect(res.body.streetName).to.equal("langdon avenue");
			expect(res.body.city).to.equal("Melbourne");
			expect(res.body.zip).to.equal("8033");
			expect(res.body.country).to.equal("Australia");
			});
			done();
		
		
	});
	it('should not be able to access other users location',function(done){
		api.get('/user/10/location')
		.set('Accept','application/x-www-form-urlencoded')
		.send({
			userId:1
		})
		.expect(404)
		.end(function(err, res){
			if(err) return done(err);
			expect(res.error.text).to.equal("Unauthorized");
				
			});
			done();
	});
});
