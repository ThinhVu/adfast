'use strict';
Object.defineProperty(exports, "__esModule", {
	value: true
});
var _regenerator = require('babel-runtime/regenerator');
var _regenerator2 = _interopRequireDefault(_regenerator);
exports.isAuthenticated = isAuthenticated;
exports.hasRoleAdmin = hasRoleAdmin;
exports.isLoginApi = isLoginApi;
exports.isNotLoginApi = isNotLoginApi;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;
exports.checkExpiresTokenRedirect = checkExpiresTokenRedirect;
var _jsonwebtoken = require('jsonwebtoken');
var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _jwtDecode = require('jwt-decode');
var _jwtDecode2 = _interopRequireDefault(_jwtDecode);
var _composableMiddleware = require('composable-middleware');
var _composableMiddleware2 = _interopRequireDefault(_composableMiddleware);
var _environment = require('../config/environment');
var _environment2 = _interopRequireDefault(_environment);
var _constant = require('../components/app/constants/constant');
var constants = _interopRequireWildcard(_constant);
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ensureAuthorized() {
	return (0, _composableMiddleware2.default)().use(function (req, res, next) {
		var bearerToken = void 0;
		var bearerHeader = req.headers['authorization'];
		console.log(bearerHeader);
		if (typeof bearerHeader !== 'undefined') {
			try {
				var bearer = bearerHeader.split(" ");
				bearerToken = bearer[1].trim();
				if (bearerToken == undefined || bearerToken.length < 40) {
					return res.status(403).json({ success: false, message: constants.error.token_fake_hacker });
				} else {
					req.token = bearerToken;
					return next();
				}
			} catch (error) {
				return res.status(498).json({ success: false, message: constants.error.token_fake_hacker });
			}
		} else {
			return res.status(498).json({ success: false, message: constants.error.not_provide_token });
		}
	})
	.use(function (req, res, next) {
		req.token = req.token || req.cookies.token || null;
		if (req.token == null) {
			return res.status(498).json({
				success: false, message: constants.error.expired_authenticate
			});
		} else {
			var iat = (0, _jwtDecode2.default)(req.token)['iat'];
			var remainTime = Math.floor((new Date(iat * 1000) - new Date()) / 1000);
			if (remainTime <= 0) {
				res.clearCookie('token');
				return res.status(498).json({
					success: false, message: constants.error.expired_authenticate
				});
			} else {
				return next();
			}
		}
	});
}
function attachUserToRequest() {
	return (0, _composableMiddleware2.default)().use(function (req, res, next) {
		var token = req.token || null;
		if (token && token !== "undefined") {
			_jsonwebtoken2.default.verify(token, _environment2.default.secret.session, function (err, tokenDecoded) {
				if (err) {
					res.clearCookie('token');
					return res.status(498).json({
						success: false, message: constants.error.expired_authenticate
					});
				} else {
					req.user = tokenDecoded.user;
					return next();
				}
			});
		} else {
			res.clearCookie('token');
			return res.status(498).json({ success: false, message: constants.error.not_provide_token });
		}
	});
}
function isAuthenticated() {
	return (0, _composableMiddleware2.default)().use(ensureAuthorized()).use(attachUserToRequest());
}
function hasRoleAdmin() {
	return (0, _composableMiddleware2.default)().use(isAuthenticated()).use(function (req, res, next) {
		if (req.user.role === true) {
			return next();
		} else {
			return res.status(403).json({ success: false, message: constants.error.not_access_admin });
		}
	});
}
function isLoginApi() {
	return (0, _composableMiddleware2.default)().use(function (req, res, next) {
		if (req.cookies.token) {
			req.token = req.cookies.token;
			_jsonwebtoken2.default.verify(req.token, _environment2.default.secret.session, function (error) {
				if (error) {
					res.clearCookie('token');
					return res.status(498).json({ success: false, error: error });
				} else {
					next();
				}
			});
		} else {
			return res.status(400).json({ success: false, message: constants.error.not_provide_token });
		}
	});
}
function isNotLoginApi() {
	return (0, _composableMiddleware2.default)().use(function (req, res, next) {
		if (req.cookies.token) {
			req.token = req.cookies.token;
			_jsonwebtoken2.default.verify(req.token, _environment2.default.secret.session, function (err) {
				if (err) {
					res.clearCookie('token');
					next();
				} else {
					return res.status(400).json({ success: false, message: constants.warning.not_create_user });
				}
			});
		} else {
			next();
		}
	});
}
function signToken(user) {
	return _jsonwebtoken2.default.sign({ user: user, iat: Math.floor(Date.now() / 1000) + _environment2.default.timeTokenExpire }, _environment2.default.secret.session);
}
function setTokenCookie(req, res) {
	if (!req.user) {
		return res.status(400).send(constants.error.login_system);
	}
	var token = signToken(req.user);
	res.cookie('token', token);
	res.redirect('/');
}
function checkExpiresTokenRedirect(req, res, next) {
	var iat, remainTime;
	return _regenerator2.default.async(function checkExpiresTokenRedirect$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					req.token = req.token || req.cookies.token || null;
					_context.t0 = req.token;
					_context.next = _context.t0 === null ? 4 : 6;
					break;
				case 4:
					res.redirect('/');
					return _context.abrupt('break', 14);
				case 6:
					_context.next = 8;
					return _regenerator2.default.awrap((0, _jwtDecode2.default)(req.token)['iat']);
				case 8:
					iat = _context.sent;
					_context.next = 11;
					return _regenerator2.default.awrap(Math.floor((new Date(iat * 1000) - new Date()) / 1000));
				case 11:
					remainTime = _context.sent;
					if (remainTime <= 0) {
						res.clearCookie('token');
						res.redirect('/');
					} else {
						next();
					}
					return _context.abrupt('break', 14);
				case 14:
				case 'end':
					return _context.stop();
			}
		}
	}, null, this);
}