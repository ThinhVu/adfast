'use strict';
Object.defineProperty(exports, "__esModule", {
	value: true
});
var _mongoose = require('mongoose');
var _mongoose2 = _interopRequireDefault(_mongoose);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var Schema = _mongoose2.default.Schema;
var TransactionSchema = new Schema({
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		require: true
	},
	amount: {
		type: Number,
		require: true,
		default: 0
	},
	message: {
		type: String,
		require: false,
		trim: true
	}
}, { timestamps: true });
exports.default = _mongoose2.default.model('Transaction', TransactionSchema);