/**
 * @author: ManhNV
 * @copyright: AdFast 2017- Mobile Solution
 * @description: is msisdn information
 * @define 12/27/2016.
 * @version: 1.0.0
 */
'use strict';

import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let MsisdnMapSchema = new Schema({
	ip: String,
	msisdn: String, //phone
	carrier: String,
	os: String,
	mobile: String,
	city: String,
	dateCreate: Date
});

export default mongoose.model('MsisdnMap', MsisdnMapSchema);