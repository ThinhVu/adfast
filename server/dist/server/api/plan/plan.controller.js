'use strict';
Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createPlan = createPlan;
exports.getPlan = getPlan;
exports.updatePlan = updatePlan;
exports.deletePlan = deletePlan;
var _plan = require('./plan.model');
var _plan2 = _interopRequireDefault(_plan);
var _constant = require('../../components/app/constants/constant');
var _constant2 = _interopRequireDefault(_constant);
var _support = require('../../components/app/middlewares/support.middleware');
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var IdValid = require('mongoose').Types.ObjectId.isValid;
function createPlan(req, res) {
	try {
		if (!req.body.name || !req.body.description || !req.body.price || !req.body.maxPhone || !req.body.dayDuration || !parseInt(req.body.maxPhone) || !parseFloat(req.body.price) || !parseInt(req.body.dayDuration)) (0, _support.invalidParams)(res);
		else {
				var plan = new _plan2.default({
					name: req.body.name,
					description: req.body.description,
					price: parseFloat(req.body.price),
					maxPhone: parseInt(req.body.maxPhone),
					dayDuration: parseInt(req.body.dayDuration)
				});
				plan.save().then(function (planItem) {
					return res.status(200).json({ success: true, data: planItem });
				}).catch((0, _support.validationError)(res));
			}
	} catch (error) {
		return res.status(400).json({ success: false, error: error });
	}
}
function getPlan(req, res) {
	try {
		return _plan2.default.find({}).exec().then(function (listPlan) {
			if (listPlan.length === 0) return res.status(400).json({
				success: false,
				error: _constant2.default.error.plan_is_empty
			});
			res.status(200).json({ success: true, data: listPlan });
		}).catch((0, _support.validationError)(res, 404));
	} catch (error) {
		return res.status(400).json({ success: false, error: error });
	}
}
function updatePlan(req, res) {
	try {
		if (!req.body.name || !req.body.description || !req.body.price || !req.body.maxPhone || !req.body.dayDuration || !parseInt(req.body.maxPhone) || !parseFloat(req.body.price) || !parseInt(req.body.dayDuration)) (0, _support.invalidParams)(res);
		else {
				_plan2.default.findByIdAndUpdate(req.body._id, {
					$set: {
						name: req.body.name,
						description: req.body.description,
						price: parseFloat(req.body.price),
						maxPhone: parseInt(req.body.maxPhone),
						dayDuration: parseInt(req.body.dayDuration)
					}
				}).exec().then(function (planUpdate) {
					return res.status(200).json({
						success: true,
						message: _constant2.default.success.update_plan_success
					});
				}).catch((0, _support.validationError)(res, 503));
			}
	} catch (error) {
		return res.status(400).json({ success: false, error: error });
	}
}
function deletePlan(req, res) {
	try {
		if (!req.body._id || !IdValid(req.body._id)) (0, _support.invalidParams)(res);
		return _plan2.default.findByIdAndRemove(req.body._id).exec().then(function (message) {
			return res.status(204).end();
		}).catch((0, _support.validationError)(res));
	} catch (error) {
		return res.status(400).json({ success: false, error: error });
	}
}