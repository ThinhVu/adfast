/**
 * Created by ManhNV on 12/19/2016.
 */
'use strict';

import sha512 from 'crypto-js/sha512';
import mongoose from 'mongoose';
import constants from '../../components/app/constants/constant';

let Schema = mongoose.Schema;

let UserSchema = Schema({
	username: {type: String, require: true},
	password: {type: String, require: true},
	email: {
		type: String,
		require: true,
		lowercase: true,
		index: true,
		unique: true,
		trim: true
	},
	address: {
		city: String,
		district: String
	},
	phone: {
		type: String,
		require: true
	},
	retryAttempt: {
		type: Number,
		min: 0,
		max: 5,
		default: 0
	},
	isLock: {
		type: Boolean,
		require: true,
		default: false
	},
	active: {
		type: Boolean,
		require: true,
		default: false
	},
	lastLockedTime: Number,
	role: {
		type: Boolean,
		require: true,
		default: false
	},
	budget: {type: Number, require: true, default: 0}
}, {timestamps: true});

/**
 * Virtual: is information virtual not store in database
 * => get data temp
 * */

//Public profile information
UserSchema
	.virtual('profile')
	.get(function () {
		return {
			username: this.username,
			email: this.email,
			address: this.address,
			phone: this.phone,
			budget: this.budget
		};
	});

//Information sensitive save in token
UserSchema
	.virtual('token')
	.get(function () {  
		return {
			_id: this._id,
			role: this.role,
			email: this.email
		};
	});

/**
 * Pre-save hook (serial)
 */
//use arrow function => die
UserSchema.pre('save', function (next) {
	if (!this.isModified('password')) {
		return next();
	} else {
		this.password = this.encryptPassword(this.password);
		next();
	}
});

/**
 * validation
 */

//Validate password
UserSchema
	.path('password')
	.validate(password => {
		return password.trim().length >= 6;
	}, constants.warning.password_length_invalid);

//Validate email
// UserSchema
// 	.path('email')
// 	.validate(email => {
// 		let pattern = /\w+\.?\w+@\w{3,8}\.\w{2,5}$/;
// 		return pattern.test(email);
// 	}, constants.warning.email_invalid);

//Validate phone
UserSchema
	.path('phone')
	.validate(phone => {
		let pattern = /\d{10,11}/g;
		return pattern.test(phone);
	}, 'Số điện thoại không hợp lệ!');

/**
 * Method
 * @type {{encryptPassword: ((password))}}
 */
UserSchema.methods = {
	/**
	 * authenticate password user
	 * @param password
	 */
	authenticate(password){
		return this.password === this.encryptPassword(password);
	},
	/**
	 * crypt password with sha512
	 * @param password
	 * @returns {*}
	 */
	encryptPassword(password){
		return sha512(password.toLowerCase()).toString();
	}
};

export default mongoose.model('User', UserSchema);