'use strict';
Object.defineProperty(exports, "__esModule", {
	value: true
});
var _promise = require('babel-runtime/core-js/promise');
var _promise2 = _interopRequireDefault(_promise);
exports.getPackage = getPackage;
exports.getAllPackage = getAllPackage;
exports.createPackage = createPackage;
exports.updatePackage = updatePackage;
var _moment = require('moment');
var _moment2 = _interopRequireDefault(_moment);
var _package = require('./package.model');
var _package2 = _interopRequireDefault(_package);
var _user = require('../user/user.model');
var _user2 = _interopRequireDefault(_user);
var _plan = require('../plan/plan.model');
var _plan2 = _interopRequireDefault(_plan);
var _transaction = require('../transaction/transaction.model');
var _transaction2 = _interopRequireDefault(_transaction);
var _constant = require('../../components/app/constants/constant');
var _constant2 = _interopRequireDefault(_constant);
var _support = require('../../components/app/middlewares/support.middleware');
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var ObjectId = require('mongoose').mongo.ObjectId;
var IdValid = require('mongoose').Types.ObjectId.isValid;
function getPackage(req, res) {
	try {
		return _package2.default.findOne({ _user: ObjectId(req.user._id) }, '-_id').exec().then(function (pkgRegister) {
			if (!pkgRegister) return res.status(404).json({
				success: false,
				error: _constant2.default.package.error.user_not_register_package
			});
			res.status(200).json({ success: true, data: pkgRegister });
		}).catch((0, _support.validationError)(res));
	} catch (error) {
		return res.status(400).json({ success: false, error: error });
	}
}
function getAllPackage(req, res) {
	try {
		return _package2.default.find({}).populate({
			path: '_user',
			select: 'username email phone budget'
		}).exec().then(function (listPackage) {
			if (listPackage.length === 0) return res.status(404).json({
				success: false,
				error: _constant2.default.package.error.system_not_found_package
			});
			res.status(200).json({ success: false, data: listPackage });
		}).catch((0, _support.validationError)(res));
	} catch (error) {
		return res.status(400).json({ success: false, error: error });
	}
}
function createPackage(req, res) {
	try {
		if (!req.body._user || !IdValid(req.body._user)) (0, _support.invalidParams)(res);else {
			return _package2.default.findOne({ _user: ObjectId(req.body._user) }).exec().then(function (pkg) {
				if (pkg) return res.status(400).json({
					success: false,
					error: _constant2.default.package.warning.package_not_create
				});
				var newPackage = new _package2.default({
					_user: req.body._user,
					phoneRemain: 0,
					dateExpire: (0, _moment2.default)().second(0).minute(0).hour(0)._d
				});
				return newPackage.save().then(function (pkg) {
					return res.status(200).json({ success: true, data: pkg });
				}).catch((0, _support.validationError)(res));
			}).catch((0, _support.validationError)(res));
		}
	} catch (error) {
		return res.status(400).json({ success: false, error: error });
	}
}
function updatePackage(req, res) {
	try {
		if (!req.body.email || !req.body['namePlan']) (0, _support.invalidParams)(res);else {
			return _promise2.default.all([getIdUser(req), getPackagePlan(req)]).then(function (result) {
				_package2.default.findOne({ _user: ObjectId(result[0]) }).exec().then(function (pkg) {
					if (!pkg) {
						return res.status(400).json({
							success: false,
							error: _constant2.default.package.error.not_find_package
						});
					}
					else if (new Date(pkg.dateExpire) - new Date() <= 0) {
							updatePackageComponent(pkg, result, Date.now(), res);
						}
						else {
								updatePackageComponent(pkg, result, pkg.dateExpire, res);
							}
				}).catch((0, _support.validationError)(res));
			}).catch((0, _support.validationError)(res));
		}
	} catch (error) {
		return res.status(400).json({ success: false, error: error });
	}
}
function updatePackageComponent(pkg, result, dateRemain, res) {
	var tempPhoneRemain = pkg.phoneRemain <= 0 ? 0 : pkg.phoneRemain;
	pkg.phoneRemain = tempPhoneRemain + parseInt(result[1][0]); 
	pkg.dateExpire = (0, _moment2.default)(dateRemain).add(parseInt(result[1][1]), 'days')._d; 
	pkg.save().then(function () {
		var transaction = new _transaction2.default({
			_user: result[0],
			message: _constant2.default.package.success.register_plan_success.format(result[1][3]),
			amount: result[1][2]
		});
		transaction.save();
		res.status(200).json({
			success: true,
			message: _constant2.default.package.success.update_package_success
		});
	}).catch((0, _support.validationError)(res));
}
function getIdUser(req) {
	return new _promise2.default(function (resolve, reject) {
		_user2.default.findOne({ email: req.body.email.trim() }).exec().then(function (user) {
			if (user) resolve(user._id.toString());else reject({
				error: _constant2.default.package.warning.account_register_not_exist
			});
		}).catch(function (error) {
			return reject(error);
		});
	});
}
function getPackagePlan(req) {
	return new _promise2.default(function (resolve, reject) {
		_plan2.default.findOne({ name: req.body['namePlan'].trim() }).exec().then(function (plan) {
			if (plan) resolve([plan.maxPhone, plan.dayDuration, plan.price, plan.name]);else reject({ error: _constant2.default.package.warning.plan_choice_not_exist });
		}).catch(function (error) {
			return reject(error);
		});
	});
}