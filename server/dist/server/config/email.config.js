'use strict';
Object.defineProperty(exports, "__esModule", {
	value: true
});
var _promise = require('babel-runtime/core-js/promise');
var _promise2 = _interopRequireDefault(_promise);
exports.sendEmailActiveUser = sendEmailActiveUser;
exports.sendEmailForgotPassword = sendEmailForgotPassword;
var _nodemailer = require('nodemailer');
var _nodemailer2 = _interopRequireDefault(_nodemailer);
var _sha = require('crypto-js/sha512');
var _sha2 = _interopRequireDefault(_sha);
var _environment = require('../config/environment');
var _environment2 = _interopRequireDefault(_environment);
var _constant = require('../components/app/constants/constant');
var _constant2 = _interopRequireDefault(_constant);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function sendEmailActiveUser(user) {
	return new _promise2.default(function (resolve, reject) {
		var timeStampNow = Math.floor(new Date().valueOf() / 1000);
		var keyPass = (0, _sha2.default)('' + _environment2.default.email.keyValidateSendMail + timeStampNow).toString();
		var domainRequest = _environment2.default.domain === "http://localhost:8585" ? _environment2.default.domain : 'http://adfast.tech';
		var hrefParam = domainRequest + '/active-account?t=' + timeStampNow + ('&k=' + keyPass + '&chkdeauth=f18932czz124567' + user._id + '1234x34678334');
		var mailOptions = {
			from: '"WeMobile-CRM. \uD83D\uDC65" <' + _environment2.default.email.smtpConfig.auth.user + '>', 
			to: user.email, 
			subject: 'Kích hoạt tài khoản ✔', 
			text: 'Xin chào đây là hòm thư tự động kích hoạt tài khoản 🐴', 
			html: '<div>\n\t\t\t\t\t\t<h2>\u0110\xE2y l\xE0 th\u01B0 k\xEDch ho\u1EA1t email t\u1EF1 \u0111\u1ED9ng g\u1EEDi t\u1EEB h\xF2m th\u01B0 c\u1EE7a WeMobile \uD83D\uDC34</h2>\n\t\t\t\t\t\t<p style="font-weight: bold;font-style: italic;">C\u1EA3m \u01A1n b\u1EA1n \u0111\xE3 tin t\u01B0\u1EDFng s\u1EED d\u1EE5ng d\u1ECBch v\u1EE5 c\u1EE7a ch\xFAng t\xF4i, \u0111\u1EC3 \n\t\t\t\t\t\tk\xEDch ho\u1EA1t t\xE0i kho\u1EA3n b\u1EA1n vui l\xF2ng k\xEDch v\xE0o \u0111\u01B0\u1EDDng link b\xEAn d\u01B0\u1EDBi\n\t\t\t\t\t\t </p>\n\t\t\t\t\t\t <a href="' + hrefParam + '">' + hrefParam + '</a>\n\t\t\t\t\t\t<p style="color: red;font-style: italic;">Ch\xFA \xFD: Email k\xEDch ho\u1EA1t n\xE0y c\xF3 th\u1EDDi gian h\u1EE3p l\u1EC7 trong v\xF2ng 3 \n\t\t\t\t\t\tng\xE0y!</p>\n\t\t\t\t\t</div>'
		};
		var transporter = _nodemailer2.default.createTransport(_environment2.default.email.smtpConfig);
		transporter.sendMail(mailOptions, function (error) {
			if (error) {
				reject({ error: _constant2.default.error.user_active_error });
			} else {
				resolve(_constant2.default.success.send_email_success);
			}
		});
	});
}
function sendEmailForgotPassword(newPassword, email) {
	return new _promise2.default(function (resolve, reject) {
		var mailOptions = {
			from: '"AddFast Phone Solution. \uD83D\uDC65" <' + _environment2.default.email.smtpConfig.auth.user + '>', 
			to: email, 
			subject: 'Mật khẩu mới ✔', 
			text: 'Xin chào đây là hòm thư thay đổi mật khẩu 🐴', 
			html: '<div>\n\t\t\t\t<h2>H\xF2m th\u01B0 thay \u0111\u1ED5i m\u1EADt kh\u1EA9u t\u1EF1 \u0111\u1ED9ng g\u1EEDi t\u1EEB AdFast \uD83D\uDC34</h2>\n\t\t\t\t<p style="font-weight: bold;font-style: italic;font-size: 20px;">M\u1EADt kh\u1EA9u c\u1EE7a b\u1EA1n \u0111\u01B0\u1EE3c thay \u0111\u1ED5i m\u1EDBi l\xE0: \n\t\t\t\t\t<span style="color:red;font-size: 24px">' + newPassword + '</span>\n\t\t\t\t </p>\n\t\t\t\t<p style="color: red;font-style: italic;">Ch\xFA \xFD: B\u1EA1n n\xEAn thay \u0111\u1ED5i l\u1EA1i m\u1EADt kh\u1EA9u m\u1EDBi ngay sau l\u1EA7n \u0111\u0103ng nh\u1EADp m\u1EDBi!\n\t\t\t\t</p>\n\t\t\t</div>'
		};
		var transporter = _nodemailer2.default.createTransport(_environment2.default.email.smtpConfig);
		transporter.sendMail(mailOptions, function (error) {
			if (error) reject({ error: _constant2.default.error.system_forgot_error });
			resolve({ message: _constant2.default.success.user_reset_pass_success });
		});
	});
}