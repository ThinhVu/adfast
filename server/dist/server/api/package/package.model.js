'use strict';
Object.defineProperty(exports, "__esModule", {
	value: true
});
var _mongoose = require('mongoose');
var _mongoose2 = _interopRequireDefault(_mongoose);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var Schema = _mongoose2.default.Schema; 
var PackageSchema = Schema({
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		index: true,
		unique: true,
		require: true
	},
	phoneRemain: {
		type: Number,
		require: true,
		default: 0
	},
	dateExpire: {
		type: Date,
		require: true,
		default: new Date()
	}
});
exports.default = _mongoose2.default.model('Package', PackageSchema);