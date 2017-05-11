var express = require('express');
var router = express.Router();
var fs = require('fs');
var Image = require('../schema/imageModel');
var User = require('../schema/userModel');
var redis = require('redis');
var client = redis.createClient();

var imgPath = '/path/to/some/img.png';

//INSERT IMAGE
router.post('/insertImg', function(req, res, next) {
	console.log("/insertImg");

	//store an image in binary in mongo
	var imageInstance = new Image();

	imageInstance.img.data = fs.readFileSync(imgPath);
	imageInstance.img.contentType = 'image/png';

	imageInstance.save(function (err) {
		if (err) {
			res.send("error");
		} else {
			res.send("success");
		}
	});
});

//INSERT USER
router.post('/insertUser', function(req, res, next) {
	console.log("/insertUser");

	console.log("req.body user_firstname:: "+req.body.user_firstname);
	console.log("req.body user_lastname:: "+req.body.user_lastname);

	var userInstance = new User({
		user_firstname: req.body.user_firstname,
		user_lastname: req.body.user_lastname
	});

	userInstance.save(function (err) {
		if (err) {
			res.send("error");
		} else {
			res.send("success");
		}
	});

});

//     /api/images

//GET USER
router.get('/getUser', function(req, res, next) {
	console.log("/getUser");

	console.log("req.query.first_name:: "+req.query.first_name);
	client.exists('userdetail'+req.query.first_name, function(err, reply) {
		console.log("Redis query returned with value:"+reply);

		if (reply === 1) {
			console.log("IN IF");
			console.log('redis cache exists');
			client.hgetall('userdetail'+req.query.first_name, function(err, object) {
				res
				.status(200)
				.send({"result":JSON.parse(object.result)});
			});

		} else {
			console.log("IN ELSE");
			
			User.find({"user_firstname": req.query.first_name}, function (err, document) {
				client.hmset('userdetail'+req.query.first_name, {"result":JSON.stringify(document)});
				client.expire('userdetail'+req.query.first_name, 10);
		        res.status(200).send(document);
		    });
			
		}
	});

});









module.exports = router;