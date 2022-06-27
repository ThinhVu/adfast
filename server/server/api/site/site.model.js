/**
 * Created by ManhNV on 12/19/2016.
 */
'use strict';

import mongoose from 'mongoose';
import constants from '../../components/app/constants/constant';

let Schema = mongoose.Schema;

let SiteSchema = new Schema({
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
	usedPhone: {type: Number, require: true, default: 0},
	maxPhone: {type: Number, require: true, default: 0},
	startDate: {
		type: Date,
		default: Date.now()
	}
}, {timestamps: true});

/*SiteSchema
 .path('url')
 .validate(url => {
 let reg = /^https?:\/\/\w+\.\w+(.\w+.\w{0,7})?$/g;
 return reg.test(url);
 }, constants.warning.url_invalid);*/

export default mongoose.model('Site', SiteSchema);