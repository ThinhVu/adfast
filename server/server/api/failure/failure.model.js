/**
 * @author: ManhNV
 * @copyright: AdFast 2017- Mobile Solution
 * @description: Failure model
 * @define 06/01/2017.
 * @version: 1.0.1
 */
'use strict';

import mongoose from 'mongoose'
let Schema = mongoose.Schema;

let FailureSchema = new Schema({
	src: String,
	msg: String,
	url:String,
	dateError: {
		type: Date,
		default: new Date()
	}
});

export default mongoose.model('Failure', FailureSchema);