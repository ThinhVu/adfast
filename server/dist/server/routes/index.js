'use strict';
Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = function (app) {
	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
		next();
	});
	app.get('/authenticate', _auth.isAuthenticated(), function (req, res) {
		res.status(200).json({ success: true, message: 'authenticate success!', user: req.user });
	});
	app.use(require('../auth').default);
	app.use('/api', require('../api/static').default);
	app.use('/api/user', require('../api/user').default);
	app.use('/api/plan', require('../api/plan').default);
	app.use('/api/site', require('../api/site').default);
	app.use('/api/package', require('../api/package').default);
	app.use('/api/transaction', require('../api/transaction').default);
	app.use('/traffic', require('../api/traffic').default);
	app.use('/report', require('../api/failure').default);
	app.get('/data', function (req, res) {
		void 0;
		void 0;
		res.json({ success: true, data: "That ko the nao tin noi!" });
	});
	app.post('/xyz', function (req, res) {
		res.json({ message: 'OK' });
	});
	app.use(_static2.default);
	(0, _manage2.default)(app);
	app.use(function (req, res) {
		res.status(400).json({ message: 'not exist router' });
	});
	if (app.get('env') === 'development') {
		require('./test.router').default(app);
	}
};
var _auth = require('../auth/auth.service');
var _static = require('./static.router');
var _static2 = _interopRequireDefault(_static);
var _manage = require('./manage.router');
var _manage2 = _interopRequireDefault(_manage);
var _cors = require('cors');
var _cors2 = _interopRequireDefault(_cors);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
;