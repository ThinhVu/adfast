/**
 * @author: ManhNV
 * @copyright: AdFast 2017- Mobile Solution
 * @description: Failure controller
 * @summary: save log get phone number error
 * @define 06/01/2017.
 * @version: 1.0.1
 */
'use strict';

import Failure from './failure.model';
import constants from '../../components/app/constants/constant';
import {
	invalidParams,
	validationError
} from '../../components/app/middlewares/support.middleware';

let ObjectId = require('mongoose').mongo.ObjectId;
let IdValid = require('mongoose').Types.ObjectId.isValid;

/**
 * @method {createFailure}
 * @description: create new failure
 * @param req
 * @param res
 */
export function createFailure(req, res) {
	const failure = new Failure({
		src: req.body.src,
		msg: req.body.msg,
		url: req.body.url
	});
	failure.save()
		.then(() => res.status(204).end())
		.catch(() => res.status(400).end());
}

/**
 * @method {deleteFailure}
 * @description: remove item failure
 * @param req
 * @param res
 * @returns {*|Promise|Promise.<T>}
 */
export function deleteFailure(req, res) {
	if (!req.body._id || IdValid(req.body._id))
		invalidParams(res);
	return Failure.findOneAndRemove({_id: ObjectId(req.body._id)})
		.then(() => res.status(200).json({
			success: true,
			message: constants.success.delete_failure_success
		}))
		.catch(validationError(res, 400));
}