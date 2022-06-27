'use strict';
Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createTransaction = createTransaction;
exports.getCurrentUserTransaction = getCurrentUserTransaction;
exports.filterDateTransaction = filterDateTransaction;
exports.deleteTransaction = deleteTransaction;
exports.getAllTransaction = getAllTransaction;
exports.filterAllDateTransaction = filterAllDateTransaction;
var _moment = require('moment');
var _moment2 = _interopRequireDefault(_moment);
var _transaction = require('./transaction.model');
var _transaction2 = _interopRequireDefault(_transaction);
var _constant = require('../../components/app/constants/constant');
var _constant2 = _interopRequireDefault(_constant);
var _support = require('../../components/app/middlewares/support.middleware');
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var ObjectId = require('mongoose').mongo.ObjectId;
var IdValid = require('mongoose').Types.ObjectId.isValid;
function createTransaction(req, res) {
	try {
		if (!req.body.amount || !parseInt(req.body.amount)) (0, _support.invalidParams)(res);
		else {
				var transaction = new _transaction2.default({
					_user: req.user._id,
					amount: parseInt(req.body.amount),
					message: req.body.message || ''
				});
				transaction.save().then(function (tss) {
					return res.status(204).end();
				}).catch((0, _support.validationError)(res));
			}
	} catch (error) {
		return res.status(400).json({ success: false, error: error });
	}
}
function getCurrentUserTransaction(req, res) {
	try {
		return _transaction2.default.find({ _user: ObjectId(req.user._id) }, '-_user').exec().then(function (listTransaction) {
			if (listTransaction.length !== 0) {
				res.status(200).json({ success: true, data: listTransaction });
			} else return res.status(400).json({
				success: false,
				error: _constant2.default.transaction.warning.is_empty
			});
		}).catch((0, _support.validationError)(res, 404));
	} catch (error) {
		return res.status(400).json({ success: false, error: error });
	}
}
function filterDateTransaction(req, res) {
	try {
		if (!req.body['timeStart'] || !req.body['timeEnd'] || !checkDate(req.body['timeStart']) || !checkDate(req.body['timeEnd'])) (0, _support.invalidParams)(res);else {
			var timeStart = (0, _moment2.default)(req.body['timeStart'] + ' 00:00:01').toISOString();
			var timeEnd = (0, _moment2.default)(req.body['timeEnd'] + ' 23:59:59').toISOString();
			return _transaction2.default.find({
				_user: req.user._id,
				createdAt: {
					'$gte': new Date(timeStart),
					'$lte': new Date(timeEnd)
				}
			}, '-_user').exec().then(function (listTransaction) {
				if (listTransaction.length === 0) return res.status(404).json({
					success: false,
					message: _constant2.default.transaction.warning.search_transaction_empty
				});
				res.status(200).json({ success: true, data: listTransaction });
			}).catch((0, _support.validationError)(res));
		}
	} catch (error) {
		return res.status(503).json({ success: false, error: error });
	}
}
function deleteTransaction(req, res) {
	try {
		if (!req.body._id || !IdValid(req.body._id)) (0, _support.invalidParams)(res);
		return _transaction2.default.findByIdAndRemove(req.body._id).exec().then(function (message) {
			return res.status(204).end();
		}).catch((0, _support.validationError)(res));
	} catch (error) {
		return res.status(400).json({ success: false, error: error });
	}
}
function getAllTransaction(req, res) {
	try {
		return _transaction2.default.find({}).populate({
			path: '_user',
			select: 'email -_id'
		}).sort({ $natural: 1 }) 
		.skip(parseInt(req.query.start) || 0).limit(parseInt(req.query.count) || 20).exec().then(function (listTransaction) {
			if (listTransaction.length === 0) return res.status(400).json({
				success: false,
				error: _constant2.default.transaction.warning.system_is_empty
			});
			res.status(200).json({ success: true, data: listTransaction });
		}).catch((0, _support.validationError)(res, 404));
	} catch (error) {
		return res.status(400).json({ success: false, error: error });
	}
}
function filterAllDateTransaction(req, res) {
	try {
		if (!req.body['timeStart'] || !req.body['timeEnd'] || !checkDate(req.body['timeStart']) || !checkDate(req.body['timeEnd'])) (0, _support.invalidParams)(res);else {
			var timeStart = (0, _moment2.default)(req.body['timeStart'] + ' 00:00:01').toISOString();
			var timeEnd = (0, _moment2.default)(req.body['timeEnd'] + ' 23:59:59').toISOString();
			return _transaction2.default.find({
				createdAt: {
					'$gte': new Date(timeStart),
					'$lte': new Date(timeEnd)
				}
			}).exec().then(function (listTransaction) {
				if (listTransaction.length === 0) return res.status(404).json({
					success: false,
					error: _constant2.default.transaction.warning.search_transaction_empty
				});
				res.status(200).json({ success: true, data: listTransaction });
			}).catch((0, _support.validationError)(res));
		}
	} catch (error) {
		return res.status(503).json({ success: false, error: error });
	}
}
function checkDate(dateTime) {
	return (0, _moment2.default)(dateTime, 'YYYY-MM-DD', true).isValid();
}