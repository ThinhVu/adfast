'use strict';
Object.defineProperty(exports, "__esModule", {
	value: true
});
var _mongoose = require('mongoose');
var _mongoose2 = _interopRequireDefault(_mongoose);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var Schema = _mongoose2.default.Schema;
var TrafficSchema = new Schema({
	_site: {
		type: Schema.Types.ObjectId,
		ref: 'Site',
		require: true
	},
	_user: String,
	phone: String,
	carrier: String,
	url: String,
	referrer: String,
	os: String,
	mobile: String,
	city: String,
	requestTime: Date,
	accessNumber: Number
});
TrafficSchema.index({ _site: 1, phone: 1 }, { unique: true });
exports.default = _mongoose2.default.model('Traffic', TrafficSchema);