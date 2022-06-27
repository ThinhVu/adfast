/**
 * @author: ManhNV
 * @copyright: AdFast 2017- Mobile Solution
 * @description: is package user register
 * @define 12/27/2016.
 * @version: 1.0.0
 */

import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let PackageSchema = Schema({
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

export default mongoose.model('Package', PackageSchema);