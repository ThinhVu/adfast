'use strict';
Object.defineProperty(exports, "__esModule", {
	value: true
});
var _sha = require('crypto-js/sha512');
var _sha2 = _interopRequireDefault(_sha);
var _mongoose = require('mongoose');
var _mongoose2 = _interopRequireDefault(_mongoose);
var _constant = require('../../components/app/constants/constant');
var _constant2 = _interopRequireDefault(_constant);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var Schema = _mongoose2.default.Schema;
var UserSchema = Schema({
	username: { type: String, require: true },
	password: { type: String, require: true },
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
	budget: { type: Number, require: true, default: 0 }
}, { timestamps: true });
UserSchema.virtual('profile').get(function () {
	return {
		username: this.username,
		email: this.email,
		address: this.address,
		phone: this.phone,
		budget: this.budget
	};
});
UserSchema.virtual('token').get(function () {
	return {
		_id: this._id,
		role: this.role,
		email: this.email
	};
});
UserSchema.pre('save', function (next) {
	if (!this.isModified('password')) {
		return next();
	} else {
		this.password = this.encryptPassword(this.password);
		next();
	}
});
UserSchema.path('password').validate(function (password) {
	return password.trim().length >= 6;
}, _constant2.default.warning.password_length_invalid);
UserSchema.path('phone').validate(function (phone) {
	var pattern = /\d{10,11}/g;
	return pattern.test(phone);
}, 'Số điện thoại không hợp lệ!');
UserSchema.methods = {
	authenticate: function authenticate(password) {
		return this.password === this.encryptPassword(password);
	},
	encryptPassword: function encryptPassword(password) {
		return (0, _sha2.default)(password.toLowerCase()).toString();
	}
};
exports.default = _mongoose2.default.model('User', UserSchema);