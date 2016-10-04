const passport = require('passport');
const UserModel = require('../models/userModel');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');


//Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
	//Verify this username and password, call done with user otherwise, call done with false if not correct
	UserModel.findOne({ email: email }, function(err, user) {
		if(err) { return done(err); }
		if(!user) { return done(null, false); }

		//Compare if password == password in UserModel
	})
})


//Setup Options for JWT Strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

//Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	//See if the user in the payload exists in the database, if it does call done with that user
	//otherwise call done without a user object

	UserModel.findById(payload.sub, function (err, user) {
		if(err) { return done(err, false); }
		
		if(user) {
			done(null, user);
		} 
		else {
			done(null, false);
		}
	})
});

//Tell Passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);