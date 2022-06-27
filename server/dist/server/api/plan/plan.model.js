'use strict';
Object.defineProperty(exports, "__esModule", {
	value: true
});
var _mongoose = require('mongoose');
var _mongoose2 = _interopRequireDefault(_mongoose);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var PlanSchema = _mongoose2.default.Schema({
	name: {
		type: String,
		index: true,
		unique: true,
		require: true
	},
	description: { type: String, require: true },
	price: { type: Number, require: true },
	maxPhone: { type: Number, require: true },
	dayDuration: { type: Number, require: true }
}, { timestamps: true });
exports.default = _mongoose2.default.model('Plan', PlanSchema);