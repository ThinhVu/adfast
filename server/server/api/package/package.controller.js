/**
 * @author: ManhNV
 * @copyright: AdFast 2017- Mobile Solution
 * @description: package controller execute
 * @define 12/19/2016.
 * @version: 1.0.0
 */

'use strict';

//Todo comment and replace string => constant
import moment from 'moment';

import Package from './package.model';
import User from '../user/user.model';
import Plan from '../plan/plan.model';
import Transaction from '../transaction/transaction.model';
import constants from '../../components/app/constants/constant';
import {
	validationError,
	invalidParams
} from '../../components/app/middlewares/support.middleware';

let ObjectId = require('mongoose').mongo.ObjectId;
let IdValid = require('mongoose').Types.ObjectId.isValid;

/**
 * @method {getPackage}
 * @description: get single package
 * @pre-condition: user login success
 * @param req
 * @param res
 * @returns {*|Query}
 */
export function getPackage(req, res) {
	try {
		return Package.findOne({_user: ObjectId(req.user._id)}, '-_id').exec()
			.then(pkgRegister => {
				if (!pkgRegister)
					return res.status(404).json({
						success: false,
						error: constants.package.error.user_not_register_package
					});
				res.status(200).json({success: true, data: pkgRegister});
			})
			.catch(validationError(res));
	}
	catch (error) {
		return res.status(400).json({success: false, error});
	}
}

/**=========RESTRICTION: ADMIN MANAGE================================================================================*/

/**
 * @method {getAllPackage}
 * @description: get single package
 * @pre-condition: user login success
 * @param req
 * @param res
 * @requires {admin}
 * @returns {*|Query}
 */
export function getAllPackage(req, res) {
	try {
		return Package.find({})
			.populate({
				path: '_user',
				select: 'username email phone budget'
			})
			.exec()
			.then(listPackage => {
				if (listPackage.length === 0)
					return res.status(404).json({
						success: false,
						error: constants.package.error.system_not_found_package
					});
				res.status(200).json({success: false, data: listPackage});
			})
			.catch(validationError(res));
	}
	catch (error) {
		return res.status(400).json({success: false, error});
	}
}

/**
 * @method {createPackage}
 * @description: create package
 * @pre-condition: access - administrator
 * @param req
 * @param res
 * @requires {admin}
 */
export function createPackage(req, res) {
	try {
		if (!req.body._user || !IdValid(req.body._user))
			invalidParams(res);
		else {
			return Package.findOne({_user: ObjectId(req.body._user)}).exec()
				.then(pkg => {
					if (pkg) return res.status(400).json({
						success: false,
						error: constants.package.warning.package_not_create
					});
					//package create to default
					let newPackage = new Package({
						_user: req.body._user,
						phoneRemain: 0,
						dateExpire: moment().second(0).minute(0).hour(0)._d
					});

					return newPackage.save()
						.then(pkg => res.status(200).json({success: true, data: pkg}))
						.catch(validationError(res));
				})
				.catch(validationError(res));
		}
	}
	catch (error) {
		return res.status(400).json({success: false, error});
	}
}

/**
 * @method {updatePackage}
 * @description: update package
 * @summary: allow input email -> find user, input namePlan -> find plan
 * @param req
 * @param res
 */
export function updatePackage(req, res) {
	try {
		if (!req.body.email || !req.body['namePlan'])
			invalidParams(res);
		else {
			return Promise.all([getIdUser(req), getPackagePlan(req)])
				.then(result => {
					//result is array [_id, maxPhone, dayDuration]
					Package.findOne({_user: ObjectId(result[0])}).exec()
						.then(pkg => {
							if (!pkg) {
								return res.status(400).json({
									success: false,
									error: constants.package.error.not_find_package
								});
							}
							//ngày hết nhưng (phoneRemain chưa hết hoặc đã hết) => reset ngày và maxPhone theo gói mới
							else if ((new Date(pkg.dateExpire) - new Date()) <= 0) {
								updatePackageComponent(pkg, result, Date.now(), res)
							}
							//phoneRemain hết nhưng ngày chưa hết => cộng dồn ngày
							//phone chưa hết và ngày cũng chưa hết => cộng dồn cả 2
							else {
								updatePackageComponent(pkg, result, pkg.dateExpire, res)
							}
						}).catch(validationError(res));
				})
				.catch(validationError(res));
		}
	} catch (error) {
		return res.status(400).json({success: false, error});
	}
}

/**=============FUNCTION SUPPORT ===================================================================*/

/**
 * @method {updatePackageComponent}
 * @description: function support update package
 * @param pkg
 * @param result
 * @param dateRemain
 * @param res
 * @requires {admin}
 */
function updatePackageComponent(pkg, result, dateRemain, res) {
	const tempPhoneRemain = (pkg.phoneRemain <= 0) ? 0 : pkg.phoneRemain;
	pkg.phoneRemain = tempPhoneRemain + parseInt(result[1][0]); //reset phoneRemain = maxPhone
	pkg.dateExpire = moment(dateRemain).add(parseInt(result[1][1]), 'days')._d; //reset dateExpire
	pkg.save()
		.then(() => {
			//save transaction
			const transaction = new Transaction({
				_user: result[0],
				message: constants.package.success.register_plan_success.format(result[1][3]),
				amount: result[1][2]
			});
			transaction.save();
			res.status(200).json({
				success: true,
				message: constants.package.success.update_package_success
			});
		})
		.catch(validationError(res));
}

/**
 * @method {getIdUser}
 * @description: get id user from email input
 * @param req
 * @returns {Promise}
 * @requires {admin}
 */
function getIdUser(req) {
	return new Promise((resolve, reject) => {
		User.findOne({email: req.body.email.trim()}).exec()
			.then(user => {
				if (user) resolve(user._id.toString());
				else reject({
					error: constants.package.warning.account_register_not_exist
				});
			}).catch(error => reject(error));
	})
}

/**
 * @method {getPackagePlan}
 * @description: get package register from field [name] package
 * @param req
 * @returns {Promise}
 * @requires {admin}
 */
function getPackagePlan(req) {
	return new Promise((resolve, reject) => {
		Plan.findOne({name: req.body['namePlan'].trim()}).exec()
			.then(plan => {
				if (plan) resolve([plan.maxPhone, plan.dayDuration, plan.price, plan.name]);
				else reject({error: constants.package.warning.plan_choice_not_exist});
			}).catch(error => reject(error));
	});
}


