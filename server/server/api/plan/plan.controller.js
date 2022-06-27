/**
 * @author: ManhNV
 * @copyright: AdFast 2017- Mobile Solution
 * @description: plan controller execute
 * @define 12/25/2016.
 * @version: 1.0.0
 * @requires {admin}
 */

'use strict';

import Plan from './plan.model';
import constants from '../../components/app/constants/constant';
import {
	validationError,
	invalidParams
} from '../../components/app/middlewares/support.middleware';

let IdValid = require('mongoose').Types.ObjectId.isValid;

/**=========RESTRICTION:FULL ADMIN MANAGE=======================================================================*/
/**
 * @method {createPlan}
 * @description create item plan
 * @param req
 * @param res
 * @require {admin}
 */
export function createPlan(req, res) {
	try {
		if (!req.body.name || !req.body.description || !req.body.price
			|| !req.body.maxPhone || !req.body.dayDuration || !parseInt(req.body.maxPhone)
			|| !parseFloat(req.body.price) || !parseInt(req.body.dayDuration))
			invalidParams(res);
		//create plan
		else {
			const plan = new Plan({
				name: req.body.name,
				description: req.body.description,
				price: parseFloat(req.body.price),
				maxPhone: parseInt(req.body.maxPhone),
				dayDuration: parseInt(req.body.dayDuration),
			});
			plan.save()
				.then(planItem => res.status(200).json({success: true, data: planItem}))
				.catch(validationError(res));
		}
	} catch (error) {
		return res.status(400).json({success: false, error});
	}
}
//todo test het lại cú pháp regex

/**
 * @method {getPlan}
 * @description: get all plan
 * @returns {*|Authenticator}
 * @require {admin}
 */
export function getPlan(req, res) {
	try {
		return Plan.find({}).exec()
			.then(listPlan => {
				if (listPlan.length === 0)
					return res.status(400).json({
						success: false,
						error: constants.error.plan_is_empty
					});
				res.status(200).json({success: true, data: listPlan})
			})
			.catch(validationError(res, 404));
	} catch (error) {
		return res.status(400).json({success: false, error});
	}
}

/**
 * @method {updatePlan}
 * @description: update item plan
 * @param req
 * @param res
 */
export function updatePlan(req, res) {
	try {
		if (!req.body.name || !req.body.description || !req.body.price
			|| !req.body.maxPhone || !req.body.dayDuration || !parseInt(req.body.maxPhone)
			|| !parseFloat(req.body.price) || !parseInt(req.body.dayDuration))
			invalidParams(res);
		//create plan
		else {
			Plan.findByIdAndUpdate(req.body._id, {
				$set: {
					name: req.body.name,
					description: req.body.description,
					price: parseFloat(req.body.price),
					maxPhone: parseInt(req.body.maxPhone),
					dayDuration: parseInt(req.body.dayDuration),
				}
			}).exec()
				.then(planUpdate => res.status(200).json({
					success: true,
					message: constants.success.update_plan_success
				}))
				.catch(validationError(res, 503));
		}
	} catch (error) {
		return res.status(400).json({success: false, error})
	}
}

/**
 * @method {deletePlan}
 * @description delete item plan
 * @param req
 * @param res
 * @returns {*}
 * @requires {admin}
 */
export function deletePlan(req, res) {
	try {
		if (!req.body._id || !IdValid(req.body._id)) invalidParams(res);
		return Plan.findByIdAndRemove(req.body._id).exec()
			.then(message => res.status(204).end())
			.catch(validationError(res));
	}
	catch (error) {
		return res.status(400).json({success: false, error});
	}
}

