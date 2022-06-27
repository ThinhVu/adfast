'use strict';
Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = function (app) {
	app.get('/logout', function (req, res) {
		res.clearCookie('token');
		res.redirect('/');
	});
	app.get('/clear-token', function (req, res) {
		res.clearCookie('token');
		res.redirect('/');
	});
	if (_environment2.default.env === 'development') {
		app.get('/*', function (req, res) {
			"use strict";
			res.render(_path2.default.resolve(app.get('clientPath'), 'index.view.html'), { title: app.get('env') });
		});
	}
};
var _path = require('path');
var _path2 = _interopRequireDefault(_path);
var _environment = require('../config/environment');
var _environment2 = _interopRequireDefault(_environment);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
;