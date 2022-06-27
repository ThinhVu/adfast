/**
 * @author: ManhNV
 * @copyright: TakeIt Photographer Solution=> AdFast 2017- Mobile Solution
 * @description: authenticate services
 * @define 12/15/2016.
 * @version: 1.0.0
 */

'use strict';

import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import compose from 'composable-middleware';

import config from '../config/environment';
import * as constants from '../components/app/constants/constant';

/**service api middleware support =====------------------======================================================
 * ====================================******************======================================================
 * ====================================******************====================================================*/

/**
 * @method: {ensureAuthorized}
 * @description: service: get token to header and check token expires
 * @returns {*|Authenticator}
 */
function ensureAuthorized() {
	return compose()
		.use((req, res, next) => {
			let bearerToken;
			let bearerHeader = req.headers['authorization'];
			if (typeof bearerHeader !== 'undefined') {
				try {
					let bearer = bearerHeader.split(" ");
					bearerToken = bearer[1].trim();
					//if token undefined or length < 40 => token valid
					if (bearerToken == undefined || bearerToken.length < 40) {
						return res.status(403).json({success: false, message: constants.error.token_fake_hacker});
					} else {
						req.token = bearerToken;
						return next();
					}
				} catch (error) {
					return res.status(498).json({success: false, message: constants.error.token_fake_hacker});
				}
			} else {
				return res.status(498).json({success: false, message: constants.error.not_provide_token});
			}
		})
		/*check token expires*/
		.use((req, res, next) => {
			req.token = req.token || req.cookies.token || null;
			if (req.token == null) {
				return res.status(498).json({
					success: false, message: constants.error.expired_authenticate
				});
			} else {
				const iat = jwtDecode(req.token)['iat'];
				const remainTime = Math.floor(((new Date(iat * 1000)) - (new Date())) / 1000);
				if (remainTime <= 0) {
					res.clearCookie('token');
					return res.status(498).json({
						success: false, message: constants.error.expired_authenticate
					});
				} else {
					return next();
				}
			}
		})
}

/**
 * @method: {attachUserToRequest}
 * @description: service: attach token (decode) to request
 */
function attachUserToRequest() {
	return compose()
		.use((req, res, next) => {
			let token = req.token || null;
			//decode token
			if (token && token !== "undefined") {
				jwt.verify(token, config.secret.session, (err, tokenDecoded) => {
					if (err) {
						res.clearCookie('token');
						return res.status(498).json({
							success: false, message: constants.error.expired_authenticate
						});
					}
					else {
						//If authenticate success, save token => used vs another request
						req.user = tokenDecoded.user;
						return next();
					}
				});
			} else {
				//token invalid => clear token in cookie
				res.clearCookie('token');
				return res.status(498).json({success: false, message: constants.error.not_provide_token});
			}
		});
}

/**
 * @method: {isAuthenticated}
 * @description: service authenticate token and attack user information
 * @type {[*]}
 */
export function isAuthenticated() {
	return compose()
		.use(ensureAuthorized())
		.use(attachUserToRequest());
}

/**
 * @method: {hasRoleAdmin}
 * @description: check access=> admin role
 * @returns {*|Authenticator}
 */
export function hasRoleAdmin() {
	return compose()
		.use(isAuthenticated())
		.use((req, res, next) => {
			if (req.user.role === true) {
				return next();
			} else {
				return res.status(403).json({success: false, message: constants.error.not_access_admin});
			}
		});
}

/**
 * @method: {isLoginApi}
 * @description service check login exist
 * @summary: token valid => pass middleware
 */
export function isLoginApi() {
	return compose()
		.use((req, res, next) => {
			if (req.cookies.token) {
				req.token = req.cookies.token;
				jwt.verify(req.token, config.secret.session, error => {
					if (error) {
						//token invalid => clear token in cookie
						res.clearCookie('token');
						return res.status(498).json({success: false, error});
					}
					else {
						//If authenticate success, save token => used vs another request
						next();
					}
				});
			} else {
				return res.status(400).json({success: false, message: constants.error.not_provide_token});
			}
		})
}

/**
 * @method: {isNotLoginApi}
 * @description: service check login not exist
 * @summary: token invalid => pass middleware
 */
export function isNotLoginApi() {
	return compose()
		.use((req, res, next) => {
			if (req.cookies.token) {
				req.token = req.cookies.token;
				//if exist token => check token valid
				//verify token and time expires of token
				jwt.verify(req.token, config.secret.session, err => {
					if (err) {
						//token invalid => pass middleware => clear token in cookie
						res.clearCookie('token');
						next();
					}
					else {
						//If token valid => this account login => not pass middleware =>
						return res.status(400).json({success: false, message: constants.warning.not_create_user});
					}
				});
			} else {
				next();
			}
		});
}

/**service middleware support =========------------------======================================================
 * ====================================******************======================================================
 * ====================================******************====================================================*/

/**
 * @method: {signToken}
 * @description: service sign token when user login success
 * @param user
 * @returns {*}
 */
export function signToken(user) {
	//expires instead option: expiresIn => iat
	return jwt.sign({user, iat: Math.floor(Date.now() / 1000) + config.timeTokenExpire}, config.secret.session);
}

/**
 * @method: {setTokenCookie}
 * @description: service attach cookie to client
 * @param req
 * @param res
 * @returns {*}
 */
export function setTokenCookie(req, res) {
	if (!req.user) {
		return res.status(400).send(constants.error.login_system);
	}
	let token = signToken(req.user);
	res.cookie('token', token);
	res.redirect('/');
}

/**
 * @method: {checkExpiresTokenRedirect}
 * @description: service check token expires
 * @summary: if token expires = true => redirect page index '/'
 * @param req
 * @param res
 * @param next
 */
export async function checkExpiresTokenRedirect(req, res, next) {
	req.token = req.token || req.cookies.token || null;
	switch (req.token) {
		case null:
			res.redirect('/');
			break;
		default:
			const iat = await
				jwtDecode(req.token)['iat'];
			const remainTime = await
				Math.floor(((new Date(iat * 1000)) - (new Date())) / 1000);
			if (remainTime <= 0) {
				res.clearCookie('token');
				res.redirect('/');
			} else {
				next();
			}
			break;
	}
}