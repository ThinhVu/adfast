'use strict';
Object.defineProperty(exports, "__esModule", {
	value: true
});
var _mongoose = require('mongoose');
var _mongoose2 = _interopRequireDefault(_mongoose);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var Schema = _mongoose2.default.Schema;
var MsisdnLogSchema = new Schema({
	ip: String,
	msisdn: String,
	carrier: String,
	city: String,
	os: String,
	mobile: String,
	dateMove: { type: Date, default: new Date() }
});
exports.default = _mongoose2.default.model('MsisdnLog', MsisdnLogSchema);