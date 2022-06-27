'use strict';
Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createSite = createSite;
exports.getUserSite = getUserSite;
exports.getAllSite = getAllSite;
exports.updateSite = updateSite;
exports.deleteSite = deleteSite;
var _site = require('./site.model');
var _site2 = _interopRequireDefault(_site);
var _constant = require('../../components/app/constants/constant');
var _constant2 = _interopRequireDefault(_constant);
var _support = require('../../components/app/middlewares/support.middleware');
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var ObjectId = require('mongoose').mongo.ObjectId;
var IdValid = require('mongoose').Types.ObjectId.isValid;
function createSite(req, res) {
	try {
		var patternMaxPhone = /^\d+$/g;
		var patternNumberActive = /^\d+$/g; 
		var regUrl = /^https?:\/\/[\w-]+\.\w+(.\w+.\w{0,7})?\/$/g;
		if (!req.body.name || !req.body.url || !req.body.category || !req.body.isActive || !req.body.maxPhone || !patternMaxPhone.test(req.body.maxPhone) || !patternNumberActive.test(req.body.isActive) || !regUrl.test(req.body.url.trim())) {
			(0, _support.invalidParams)(res);
		} else {
			return _site2.default.findOne({
				$or: [{ url: req.body.url.trim() }, { name: req.body.name.trim() }]
			}).exec().then(function (siteExist) {
				if (siteExist) return res.status(400).json({
					success: false,
					error: _constant2.default.site.warning.site_url_has_register
				});
				var site = new _site2.default({
					_user: req.user._id,
					name: req.body.name,
					url: req.body.url,
					category: req.body.category.split(','),
					isActive: req.body.isActive === '1',
					maxPhone: parseInt(req.body.maxPhone)
				});
				return site.save().then(function (site_create) {
					return res.status(200).json({ success: true, data: site_create });
				}).catch((0, _support.validationError)(res));
			}).catch((0, _support.validationError)(res));
		}
	} catch (error) {
		return res.status(400).json({ success: false, error: error });
	}
}
function getUserSite(req, res) {
	try {
		return _site2.default.find({ _user: ObjectId(req.user._id) }).exec().then(function (listSite) {
			if (listSite.length === 0) return res.status(404).json({
				success: false,
				error: _constant2.default.site.warning.user_not_register_site
			});
			res.status(200).json({ success: true, data: listSite });
		}).catch((0, _support.validationError)(res));
	} catch (error) {
		return res.status(400).json({ success: false, error: error });
	}
}
function getAllSite(req, res) {
	try {
		return _site2.default.find({}).exec().then(function (listSite) {
			if (listSite.length === 0) return res.status(404).json({
				success: false,
				error: _constant2.default.site.warning.system_not_register_site
			});
			res.status(200).json({ success: true, data: listSite });
		}).catch((0, _support.validationError)(res));
	} catch (error) {
		return res.status(400).json({ success: false, error: error });
	}
}
function updateSite(req, res) {
	try {
		if (!req.body.action || !req.body._id || !IdValid(req.body._id)) (0, _support.invalidParams)(res);else {
			switch (req.body.action) {
				case 'active':
					activeSite(req, res);
					break;
				case 'deactive':
					activeSite(req, res);
					break;
				case 'max-phone':
					updateMaxPhone(req, res);
					break;
				default:
					(0, _support.invalidParams)(res);
					break;
			}
		}
	} catch (error) {
		return res.status(400).json({ success: false, error: error });
	}
}
function deleteSite(req, res) {
	try {
		if (!req.body._id || !IdValid(req.body._id)) (0, _support.invalidParams)(res);else {
			return _site2.default.findOne({ _id: ObjectId(req.body._id), _user: ObjectId(req.user._id) }).exec().then(function (site) {
				if (!site) return res.status(404).json({
					success: false,
					error: _constant2.default.site.warning.not_exist_site_system
				});else if (site.usedPhone !== 0) {
					return res.status(400).json({
						success: false,
						error: _constant2.default.site.error.cannot_remove_site
					});
				} else {
					return site.remove().then(function () {
						return res.status(200).json({
							success: false,
							message: _constant2.default.site.success.remove_site_success
						});
					}).catch((0, _support.validationError)(res));
				}
			});
		}
	} catch (error) {
		return res.status(400).json({ success: false, error: error });
	}
}
function activeSite(req, res) {
	try {
		return _site2.default.findOne({
			_id: ObjectId(req.body._id),
			_user: ObjectId(req.user._id)
		}).exec().then(function (site) {
			if (!site) return res.status(404).json({
				success: false,
				error: _constant2.default.site.error.system_not_exist_site_active
			});
			site.isActive = req.body.action === 'active';
			return site.save().then(function () {
				return res.status(200).json({
					success: true,
					message: req.body.action === 'active' ? _constant2.default.site.success.active_site_success : _constant2.default.site.success.deactive_site_success
				});
			}).catch((0, _support.validationError)(res));
		}).catch((0, _support.validationError)(res));
	} catch (error) {
		return res.status(400).json({ success: false, error: error });
	}
}
function updateMaxPhone(req, res) {
	try {
		var patternMaxPhone = /^\d+$/g;
		if (!req.body.maxPhone || !patternMaxPhone.test(req.body.maxPhone)) (0, _support.invalidParams)(res);else {
			var maxPhoneNumber = parseInt(req.body.maxPhone);
			return _site2.default.findOne({
				_id: ObjectId(req.body._id),
				_user: ObjectId(req.user._id)
			}).exec().then(function (site) {
				if (!site) return res.status(404).json({
					success: false,
					error: _constant2.default.site.error.cannot_site_update
				});
				else if (maxPhoneNumber <= site.usedPhone) return res.status(400).json({
						success: false,
						error: _constant2.default.site.error.max_phone_invalid
					});
					else {
							site.maxPhone = maxPhoneNumber;
							return site.save(function (error) {
								if (error) return res.status(400).json({ success: false, error: error });
								res.status(200).json({
									success: true,
									message: _constant2.default.site.success.update_subscribers_unlimited_success
								});
							}).catch((0, _support.validationError)(res));
						}
			}).catch((0, _support.validationError)(res));
		}
	} catch (error) {
		return res.status(400).json({ success: false, error: error });
	}
}