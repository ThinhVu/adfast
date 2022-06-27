'use strict';
Object.defineProperty(exports, "__esModule", {
	value: true
});
var _mongoose = require('mongoose');
var _mongoose2 = _interopRequireDefault(_mongoose);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var Schema = _mongoose2.default.Schema;
var MsisdnMapSchema = new Schema({
	ip: String,
	msisdn: String, 
	carrier: String,
	os: String,
	mobile: String,
	city: String,
	dateCreate: Date
});
exports.default = _mongoose2.default.model('MsisdnMap', MsisdnMapSchema);