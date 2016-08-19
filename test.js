var should = require('chai').should();
 expect = require('chai').expect,
 supertest = require("supertest"),
 api = supertest.agent('http://localhost:3000');
//var mocha = require('mocha');

//module.exports = api;

describe('User Details', function(){
	
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
			expect(res.body).to.have.property("firstname");
			expect(res.body.firstname).to.not.equal(null);
			expect(res.body).to.have.property("lastname");
			expect(res.body.lastname).to.not.equal(null);
			expect(res.body).to.have.property("email");
			expect(res.body.email).to.not.equal(null);
			expect(res.body).to.have.property("phoneNumber");
			expect(res.body.phoneNumber).to.not.equal(null);
			expect(res.body).to.have.property("age");
			expect(res.body.age).to.not.equal(null);
			expect(res.body).to.have.property("location");
			expect(res.body.location).to.not.equal(null);
			});
			done();
	});
	
	it('Should insert a new record',function(done){
		
		api.put('/user/1')
		.set('Accept','/x-www-form-urlencoded/')
		//.send({
		//	userId:1,
		//	firstname:"Randy",
		//	lastname:"Orton",
		//	email:"randy.orton@abc.com",
		//	phoneNumber:"61465896523",
		//	age:"39",
		//	location:"Washington DC"
		//})
		.expect(200,done)
		.end(function(err, res){
			expect(res.body.firstname).to.equal("Randy");
			expect(res.body.lastname).to.equal("Orton");
			expect(res.body.email).to.equal("randy.orton@abc.com");
			expect(res.body.phoneNumber).to.equal("61465896523");
			expect(res.body.age).to.equal("39");
			expect(res.body.location).to.equal("Washington DC");
			});
		done();
		
		
	});
	it('should not be able to access other users details',function(done){
		api.get('/user/2/details')
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
