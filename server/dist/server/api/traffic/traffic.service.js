'use strict';
Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getMessageTimeInterval = getMessageTimeInterval;
var _traffic = require('./traffic.model');
var _traffic2 = _interopRequireDefault(_traffic);
var _moment = require('moment');
var _moment2 = _interopRequireDefault(_moment);
var _q = require('q');
var _q2 = _interopRequireDefault(_q);
var _support = require('../../components/app/middlewares/support.middleware');
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getMessageTimeInterval() {
	var deferred = _q2.default.defer();
	var lastDate = (0, _moment2.default)().toISOString();
	var startDate = (0, _moment2.default)().subtract(5, 'm').toISOString();
	var option = { requestTime: { $gte: startDate, $lte: lastDate } };
	_traffic2.default.find(option).exec().then(function (traffics) {
		deferred.resolve(traffics);
	}).catch((0, _support.validationCatchError)(deferred));
	return deferred.promise;
}