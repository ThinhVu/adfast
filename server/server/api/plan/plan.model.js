/**
 * @author: ManhNV
 * @copyright: AdFast 2017- Mobile Solution
 * @description: define plan model
 * @define 12/18/2016.
 * @version: 1.0.0
 */
'use strict';

import mongoose from 'mongoose';

let PlanSchema = mongoose.Schema({
	name: {
		type: String,
		index: true,
		unique: true,
		require: true
	},
	description: {type: String, require: true},
	price: {type: Number, require: true},
	maxPhone: {type: Number, require: true},
	dayDuration: {type: Number, require: true}
}, {timestamps: true});

export default mongoose.model('Plan', PlanSchema);


