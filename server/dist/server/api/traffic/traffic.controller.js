'use strict';
Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createTraffic = createTraffic;
exports.filterTraffic = filterTraffic;
exports.pushNotification = pushNotification;
var _atob = require('atob');
var _atob2 = _interopRequireDefault(_atob);
var _traffic = require('./traffic.model');
var _traffic2 = _interopRequireDefault(_traffic);
var _site = require('../site/site.model');
var _site2 = _interopRequireDefault(_site);
var _package = require('../package/package.model');
var _package2 = _interopRequireDefault(_package);
var _msisdn_map = require('../msisdnMap/msisdn_map.model');
var _msisdn_map2 = _interopRequireDefault(_msisdn_map);
var _support = require('../../components/app/middlewares/support.middleware');
var _constant = require('../../components/app/constants/constant');
var _constant2 = _interopRequireDefault(_constant);
var _traffic3 = require('./traffic.service');
var trafficServices = _interopRequireWildcard(_traffic3);
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var ObjectId = require('mongoose').mongo.ObjectId;
function createTraffic(req, res) {
	var domain = req.headers["referer"].match(/https?:\/\/[\w.:]+\//g)[0];
	return _site2.default.findOne({ url: domain }, function (error, site) {
		if (site && site.usedPhone < site.maxPhone && site.isActive) {
			void 0;
			void 0;
			void 0;
			void 0;
			var dataRequest = JSON.parse((0, _atob2.default)(req.body.r));
			saveMsisdnMap(req, dataRequest);
			return createNewTraffic(site, dataRequest, res);
		} else {
			return res.status(400).end();
		}
	});
}
function filterTraffic(req, res) {
	var limitTo = parseInt(req.query.count || 50) > 50 ? 50 : parseInt(req.query.count);
	if (!req.query.action) (0, _support.invalidParams)(res);else switch (req.query.action) {
		case 'filter-all':
			filterAllTraffic(req, limitTo, res);
			break;
		case 'export-all':
			return exportAllTrafficHasUser(req, res);
			break;
		case 'filter-site':
			if (!req.query["site-name"]) (0, _support.invalidParams)(res);else return filterSiteTraffic(req, limitTo, res);
			break;
		case 'count-all':
			return countAllSiteHasUser(req, res);
			break;
		case 'count-site':
			if (!req.query["site-name"]) (0, _support.invalidParams)(res);else return countSite(req, res);
			break;
		default:
			(0, _support.invalidParams)(res);
			break;
	}
}
function pushNotification(req, res) {
	trafficServices.getMessageTimeInterval().then(function (traffic) {
		return res.status(200).json({ success: true, traffic: traffic });
	}).catch((0, _support.validationError)(res));
}
function saveMsisdnMap(req, dataRequest) {
	var msisdnMap = new _msisdn_map2.default({
		ip: req.connection.remoteAddress || req._remoteAddress,
		msisdn: dataRequest.phone, 
		carrier: dataRequest.carrier,
		os: dataRequest.os,
		mobile: dataRequest.mobile,
		city: dataRequest.city,
		dateCreate: new Date()
	});
	msisdnMap.save();
}
function createNewTraffic(site, dataRequest, res) {
	return _package2.default.findOne({ _user: site._user }, function (err, pkg) {
		if (pkg && pkg.phoneRemain > 0) {
			void 0;
			return _traffic2.default.update({ phone: dataRequest.phone, _site: site._id }, {
				$set: {
					_site: site._id,
					_user: site._user,
					phone: dataRequest.phone,
					carrier: dataRequest.carrier,
					url: dataRequest.url,
					referrer: dataRequest.referrer,
					os: dataRequest.os,
					mobile: dataRequest.mobile,
					city: dataRequest.city,
					requestTime: new Date()
				},
				$inc: { accessNumber: 1 }
			}, { upsert: true }, function (err, data) {
				if (data.nModified === 0) {
					pkg.phoneRemain -= 1;
					pkg.save();
					site.usedPhone += 1;
					site.save();
					res.status(204).end();
				}
				else if (data.nModified === 1) {
						res.status(204).end();
					} else return res.status(400).end();
			});
		} else {
			return res.status(400).json({ err: err });
		}
	});
}
function countAllSiteHasUser(req, res) {
	var carrierCondition = req.query.carrier != null ? { $eq: req.query.carrier } : { $ne: '' };
	return _traffic2.default.count({ _user: req.user._id, carrier: carrierCondition }).exec().then(function (count) {
		res.status(200).json({ success: true, data: count });
	}).catch((0, _support.validationError)(res));
}
function filterAllTraffic(req, limitTo, res) {
	var carrierCondition = req.query.carrier != null ? { $eq: req.query.carrier } : { $ne: '' };
	return _traffic2.default.find({ _user: req.user._id, carrier: carrierCondition }) 
	.populate({
		path: '_site',
		select: '-_id name'
	}).skip(parseInt(req.query.start || 0)).limit(limitTo).sort({ requestTime: -1 }).exec().then(function (listTraffic) {
		if (listTraffic.length !== 0) {
			res.status(200).json({ success: true, data: listTraffic });
		} else return res.status(204).json({
			success: false,
			error: _constant2.default.traffic.warning.cannot_find_traffic
		});
	}).catch((0, _support.validationError)(res));
}
function countSite(req, res) {
	return _site2.default.findOne({ name: req.query["site-name"] }).exec().then(function (site) {
		if (site) {
			var carrierCondition = req.query.carrier != null ? { $eq: req.query.carrier } : { $ne: '' };
			_traffic2.default.count({ _site: site._id, _user: req.user._id, carrier: carrierCondition }).exec().then(function (count) {
				res.status(200).json({ success: true, data: count });
			}).catch((0, _support.validationError)(res));
		} else {
			return res.status(204).json({
				success: false,
				error: _constant2.default.traffic.warning.not_site_filter
			});
		}
	}).catch((0, _support.validationError)(res));
}
function filterSiteTraffic(req, limitTo, res) {
	return _site2.default.findOne({ name: req.query["site-name"], _user: ObjectId(req.user._id) }).exec().then(function (site) {
		if (site) {
			var carrierCondition = req.query.carrier != null ? { $eq: req.query.carrier } : { $ne: '' };
			_traffic2.default.find({ _site: site._id, carrier: carrierCondition }).skip(parseInt(req.query.start || 0)).limit(limitTo).sort({ requestTime: -1 }).exec().then(function (listTraffic) {
				if (listTraffic && listTraffic.length > 0) res.status(200).json({
					success: true,
					data: listTraffic
				});
				else res.status(204).json({
						success: false,
						error: _constant2.default.traffic.warning.not_found_traffic_from_this_site
					});
			}).catch((0, _support.validationError)(res));
		} else {
			return res.status(204).json({
				success: false,
				error: _constant2.default.traffic.warning.not_site_filter
			});
		}
	}).catch((0, _support.validationError)(res));
}
function exportAllTrafficHasUser(req, res) {
	return _traffic2.default.find({ _user: req.user._id }) 
	.populate({
		path: '_site',
		select: '-_id name'
	}).exec().then(function (listTraffic) {
		if (listTraffic.length !== 0) {
			res.status(200).json({ success: true, data: listTraffic });
		} else return res.status(204).json({
			success: false,
			error: _constant2.default.traffic.warning.not_found_data_export
		});
	}).catch((0, _support.validationError)(res));
}