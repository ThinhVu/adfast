'use strict';
Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.validationError = validationError;
exports.validationCatchError = validationCatchError;
exports.invalidParams = invalidParams;
exports.checkPostTimeStamp = checkPostTimeStamp;
exports.checkGetTimeStamp = checkGetTimeStamp;
exports.checkGetTimeStampEmail = checkGetTimeStampEmail;
var _md = require('md5');
var _md2 = _interopRequireDefault(_md);
var _sha = require('crypto-js/sha512');
var _sha2 = _interopRequireDefault(_sha);
var _constant = require('../constants/constant');
var _constant2 = _interopRequireDefault(_constant);
var _environment = require('../../../config/environment');
var _environment2 = _interopRequireDefault(_environment);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function validationError(res) {
	var statusCode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 422;
	return function (error) {
		res.status(statusCode).json({ success: false, error: error });
	};
}
function validationCatchError(deferred) {
	"use strict";
	return function (error) {
		deferred.reject(error.name + ': ' + error.message);
	};
}
function invalidParams(res) {
	var statusCode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
	return res.status(statusCode).json({ success: false, message: _constant2.default.warning.invalid_param });
}
function checkPostTimeStamp(req, res, next) {
	var reg = /\d{10,11}$/g;
	if (!req.body.k || !req.body.t || !reg.test(req.body.t.trim())) {
		invalidParams(res);
	} else {
		var remainTime = Math.floor((new Date() - new Date(req.body.t * 1000)) / 1000);
		if (remainTime > _environment2.default.timeExpire) {
			return res.status(400).json({ success: false, error: 'time expires' });
		} else {
			var keyPass = (0, _md2.default)('' + _environment2.default.keyValidate + req.body.t);
			if (keyPass === req.body.k) {
				next();
			} else {
				return res.status(400).json({ success: false, error: 'key invalid', config: _environment2.default });
			}
		}
	}
}
function checkGetTimeStamp(req, res, next) {
	var reg = /\d{10,11}$/g;
	if (!req.query.k || !req.query.t || !reg.test(req.query.t.trim())) {
		invalidParams(res);
	} else {
		var remainTime = Math.floor((new Date() - new Date(req.query.t * 1000)) / 1000);
		if (remainTime > _environment2.default.timeExpire) {
			return res.status(400).json({ success: false, error: 'time expires' });
		} else {
			var keyPass = (0, _md2.default)('' + _environment2.default.keyValidate + req.query.t);
			if (keyPass == String(req.query.k)) {
				next();
			} else {
				return res.status(401).json({ success: false, error: 'key invalid' });
			}
		}
	}
}
function checkGetTimeStampEmail(req, res, next) {
	var reg = /\d{10,11}$/g;
	if (!req.query.k || !req.query.t || !reg.test(req.query.t.trim())) {
		invalidParams(res);
	} else {
		var remainTime = Math.floor((new Date() - new Date(req.query.t * 1000)) / 1000);
		if (remainTime > _environment2.default.email.timeExpireActive) {
			return res.status(404).json({
				success: false, error: 'Thời gian kích hoạt tài khoản đã vượt quá 3 ngày! Vui' + ' lòng kích hoạt lại tài khoản từ hệ thống AdFast hoặc liện hệ bộ phận support để được hỗ trợ!'
			});
		} else {
			var keyPass = (0, _sha2.default)('' + _environment2.default.email.keyValidateSendMail + req.query.t);
			if (keyPass == String(req.query.k)) {
				next();
			} else {
				invalidParams(res);
			}
		}
	}
}