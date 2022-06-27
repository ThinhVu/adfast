'use strict';
Object.defineProperty(exports, "__esModule", {
	value: true
});
var _express = require('express');
var _express2 = _interopRequireDefault(_express);
var _lodash = require('lodash');
var _lodash2 = _interopRequireDefault(_lodash);
var _path = require('path');
var _path2 = _interopRequireDefault(_path);
var _environment = require('../config/environment');
var _environment2 = _interopRequireDefault(_environment);
var _failure = require('../api/failure/failure.controller');
var _site = require('../api/site/site.model');
var _site2 = _interopRequireDefault(_site);
var _msisdn_map = require('../api/msisdnMap/msisdn_map.model');
var _msisdn_map2 = _interopRequireDefault(_msisdn_map);
var _package = require('../api/package/package.model');
var _package2 = _interopRequireDefault(_package);
var _traffic = require('../api/traffic/traffic.controller');
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var router = _express2.default.Router();
router.get('/elpis.loader.js', function (req, res) {
	res.sendFile(_path2.default.join(_environment2.default.root, 'server/public/private_loader_dtt_auth/export_file/elpis.loader.js'));
});
router.get('/elpis.ng.js', checkSite, function (req, res) {
	var ngFile = _lodash2.default.shuffle(['1', '2'])[0];
	res.sendFile(_path2.default.join(_environment2.default.root, 'server/public/private_loader_dtt_auth/export_file/ng/v' + ngFile + '.js'));
});
router.post('/report/error', _failure.createFailure);
router.post('/report/success', _traffic.createTraffic);
function checkSite(req, res, next) {
	var domain = req.headers["referer"].match(/https?:\/\/[\w.:]+\//g)[0] || req.headers["referer"];
	return _site2.default.findOne({ url: domain }, function (err, site) {
		if (site && site.usedPhone < site.maxPhone && site.isActive === true) {
			return _msisdn_map2.default.findOne({ ip: req.connection.remoteAddress || req._remoteAddress }).exec().then(function (msisdnMap) {
				if (!msisdnMap) return next();else {
					updateInformationValid(site, msisdnMap);
				}
			}).catch(function () {
				return res.status(400).end();
			});
		} else return res.status(400).end();
	});
	function updateInformationValid(site, msisdnMap) {
		_package2.default.findOne({ _user: site._user }).exec().then(function (pkg) {
			if (pkg && pkg.phoneRemain && pkg.phoneRemain > 0) {
				return res.send('Elpis.Msisdn={detect:function(){ Elpis.Report.success({ phone : "' + msisdnMap.msisdn + '",  carrier : "' + msisdnMap.carrier + '"});}}');
			} else return res.send('Elpis.Msisdn={detect:function(){}}');
		}).catch(function () {
			return res.status(400).end();
		});
	}
}
exports.default = router;