'use strict';
Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = function (app) {
	var env = app.get('env');
	if (env === "development") {
		app.use((0, _morgan2.default)('dev'));
	}
	if (env === "production") {
		// app.use((0, _morgan2.default)('combined'));
		app.use((0, _morgan2.default)('dev'));
		app.use((0, _serveFavicon2.default)(_path2.default.join(_environment2.default.root, 'server/public/images/favicon.ico')));
	}
	app.set('clientPath', _path2.default.join(_environment2.default.clientPath));
	app.use(_express2.default.static(app.get('clientPath'), {
		etag: true,
		lastModified: true,
		maxAge: (0, _ms2.default)('1d')
	}));
	app.set('views', _environment2.default.root + '/server/views');
	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');
	app.use((0, _compression2.default)());
	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.urlencoded({ extended: false }));
	app.use((0, _cookieParser2.default)());
	app.use(_passport2.default.initialize());
	app.use((0, _expressSession2.default)({
		secret: _environment2.default.secret.session,
		saveUninitialized: false,
		resave: false,
		store: new MongoStore()
	}));
	if (env === "development") {
		app.use(require('errorhandler')());
	}
};
var _express = require('express');
var _express2 = _interopRequireDefault(_express);
var _serveFavicon = require('serve-favicon');
var _serveFavicon2 = _interopRequireDefault(_serveFavicon);
var _morgan = require('morgan');
var _morgan2 = _interopRequireDefault(_morgan);
var _bodyParser = require('body-parser');
var _bodyParser2 = _interopRequireDefault(_bodyParser);
var _compression = require('compression');
var _compression2 = _interopRequireDefault(_compression);
var _cookieParser = require('cookie-parser');
var _cookieParser2 = _interopRequireDefault(_cookieParser);
var _path = require('path');
var _path2 = _interopRequireDefault(_path);
var _environment = require('./environment');
var _environment2 = _interopRequireDefault(_environment);
var _expressSession = require('express-session');
var _expressSession2 = _interopRequireDefault(_expressSession);
var _ms = require('ms');
var _ms2 = _interopRequireDefault(_ms);
var _passport = require('passport');
var _passport2 = _interopRequireDefault(_passport);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var MongoStore = require('express-session-mongo');
