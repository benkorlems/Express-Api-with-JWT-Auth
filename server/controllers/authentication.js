const jwt = require('jwt-simple');
const UserModel = require('../models/userModel');
const config = require('../config');


function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

// signin route handler
exports.signin = function(req, res, next) {
	//user has already been authenticated we just need to give them
	//a token
	res.send({ token: tokenForUser(req.user) });
}

exports.signup =  function(req, res, next) {
	//pull information from the post request
	const email = req.body.email;
	const password = req.body.password;

	if(!email || !password) {
		return res.status(422).send({ error: 'You must provide an email and password'});
	}

	//Check if a user with the given email exists
	UserModel.findOne({email: email}, function(err, existingUser) {
		if (err) { return next(err); }

		//If a user with emil exists, return an error
		if (existingUser) {
			return res.status(422).send({ error: 'Email is in use' });
		}

		//If a user with email does NOT exist, create and save user record
		const user = new UserModel({
			email: email,
			password: password
		});

		user.save(function(err) {
			if (err) { return next(err); }

			//Respond indicating user was created
			res.json({ token: tokenForUser(user) });
		})
	})
	
}
