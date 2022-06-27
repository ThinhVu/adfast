/**
 * @author: ManhNV
 * @copyright: AdFast 2017- Mobile Solution
 * @description: define transaction model
 * @define 12/18/2016.
 * @version: 1.0.0
 */
'use strict';

import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let TransactionSchema = new Schema({
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
}, {timestamps: true});

export default mongoose.model('Transaction', TransactionSchema);