'use strict';
Object.defineProperty(exports, "__esModule", {
	value: true
});
var _mongoose = require('mongoose');
var _mongoose2 = _interopRequireDefault(_mongoose);
var _constant = require('../../components/app/constants/constant');
var _constant2 = _interopRequireDefault(_constant);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var Schema = _mongoose2.default.Schema;
var SiteSchema = new Schema({
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		require: true
	},
	name: {
		type: String,
		require: true,
		index: true,
		unique: true,
		trim: true
	},
	url: {
		type: String,
		require: true,
		trim: true,
		lowercase: true,
		index: true,
		unique: true
	},
	category: [{
		type: String, require: true, trim: true
	}],
	isActive: {
		type: Boolean,
		require: true,
		default: false
	},
	usedPhone: { type: Number, require: true, default: 0 },
	maxPhone: { type: Number, require: true, default: 0 },
	startDate: {
		type: Date,
		default: Date.now()
	}
}, { timestamps: true });
exports.default = _mongoose2.default.model('Site', SiteSchema);