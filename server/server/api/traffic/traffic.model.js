/**
 * @author: ManhNV
 * @copyright: AdFast 2017- Mobile Solution
 * @description: define traffic model
 * @define 12/18/2016.
 * @version: 1.0.0
 */
'use strict';

import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let TrafficSchema = new Schema({
	_site: {
		type: Schema.Types.ObjectId,
		ref: 'Site',
		require: true
	},
	_user: String,
	phone: String,
	carrier: String,
	url: String,
	referrer:String,
	os:String,
	mobile:String,
	city: String,
	requestTime: Date,
	accessNumber: Number
});

TrafficSchema.index({_site: 1, phone: 1}, {unique: true});

export default mongoose.model('Traffic', TrafficSchema);