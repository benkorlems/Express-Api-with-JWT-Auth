const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const bcrypt = require('bcrypt-nodejs');


//Define the model
const userSchema = new Schema({
	email: { type: String, unique: true, lowercase: true },
	password: String
});

/***
//On Save Hook, encrypt password
userSchema.pre('save', function (next) {
	//gets this gives access to the user model
	const user = this;

	//Generate a salt 
	bcrypt.genSalt(10, function(err, salt) {
		if(err) { return next(err); }

		//Hash or encrypt the user password with the salt
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if(err) { return next(err); }

			//Overwrite the plain text password with the encrypted one
			user.password =  hash;
			next();
		});
	});
});
*******/

// Create the model class and export
const UserModel = mongoose.model('user', userSchema);

//Export the model class

module.exports = UserModel;