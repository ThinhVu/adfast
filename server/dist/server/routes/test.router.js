'use strict';
Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = function (app) {
	app.get('/403.html', function (req, res) {
		res.sendFile(_static.error_path.Page403);
	});
	app.get('/test', function (req, res) {
		void 0;
		res.json({ success: true, message: 'Xac thuc pass qua isLoggerIn!' });
	});
	app.get('/testCookie', function (req, res) {
		res.cookie('phone', '121212');
		res.json({ success: true, message: 'test cookie success' });
	});
	app.get('/testphone', function (req, res) {
		res.status(200).json({ data: req.headers });
	});
	app.get('/hoangdnhduc', function (req, res) {
		res.render("app/components/landing-page/test-phone.html");
	});
	app.get('/demo', function (req, res) {
		res.sendFile(app.get('clientPath') + '/test/index.test.html');
	});
	app.get('/demo/*', function (req, res) {
		res.sendFile(app.get('clientPath') + '/test/index.test.html');
	});
};
var _environment = require('../config/environment');
var _environment2 = _interopRequireDefault(_environment);
var _static = require('../config/static.config');
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }