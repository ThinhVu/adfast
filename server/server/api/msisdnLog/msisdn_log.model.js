/**
 * @author: ManhNV
 * @copyright: AdFast 2017- Mobile Solution
 * @description: is msisdnLog information
 * @define 12/27/2016.
 * @version: 1.0.0
 */
'use strict';

import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let MsisdnLogSchema = new Schema({
	ip: String,
	msisdn: String,
	carrier: String,
	city: String,
	os: String,
	mobile: String,
	dateMove: {type: Date, default: new Date()}
});

export default mongoose.model('MsisdnLog', MsisdnLogSchema);