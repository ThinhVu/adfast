'use strict';
Object.defineProperty(exports, "__esModule", {
	value: true
});
var _express = require('express');
var _express2 = _interopRequireDefault(_express);
var _passport = require('passport');
var _passport2 = _interopRequireDefault(_passport);
var _auth = require('../auth.service');
var _constant = require('../../components/app/constants/constant');
var constants = _interopRequireWildcard(_constant);
var _support = require('../../components/app/middlewares/support.middleware');
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var router = _express2.default.Router();
router.post('/login', function (req, res, next) {
	_passport2.default.authenticate('local-login', function (err, user, information) {
		var error = err || information;
		if (error) return res.status(400).json({ success: false, error: error });
		if (!user) return res.status(404).json({
			success: false,
			error: constants.error.authenticate_fail
		});
		var token = (0, _auth.signToken)(user.token);
		res.cookie('token', token);
		res.status(200).json({ success: true, token: token });
	})(req, res, next);
});
exports.default = router;