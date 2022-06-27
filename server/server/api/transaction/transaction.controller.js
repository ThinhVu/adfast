/**
 * @author: ManhNV
 * @copyright: AdFast 2017- Mobile Solution
 * @description: transaction controller execute
 * @define 12/24/2016.
 * @version: 1.0.0
 */

'use strict';

import moment from 'moment';

import Transaction from './transaction.model';
import constants from '../../components/app/constants/constant';
import {
	validationError,
	invalidParams
} from '../../components/app/middlewares/support.middleware';

let ObjectId = require('mongoose').mongo.ObjectId;
let IdValid = require('mongoose').Types.ObjectId.isValid;

/**
 * @method {createTransaction}
 * @description create item transaction
 * @param req
 * @param res
 */
export function createTransaction(req, res) {
	try {
		if (!req.body.amount || !parseInt(req.body.amount)) invalidParams(res);
		//create transaction
		else {
			const transaction = new Transaction({
				_user: req.user._id,
				amount: parseInt(req.body.amount),
				message: req.body.message || ''
			});
			transaction.save()
				.then(tss => res.status(204).end())
				.catch(validationError(res));
		}
	} catch (error) {
		return res.status(400).json({success: false, error});
	}
}

/**
 * @method {getCurrentUserTransaction}
 * @description: get a list of the current user transactions
 * @param req
 * @param res
 */
export function getCurrentUserTransaction(req, res) {
	try {
		return Transaction.find({_user: ObjectId(req.user._id)}, '-_user').exec()
			.then(listTransaction => {
				if (listTransaction.length !== 0) {
					res.status(200).json({success: true, data: listTransaction});
				} else return res.status(400).json({
					success: false,
					error: constants.transaction.warning.is_empty
				});
			})
			.catch(validationError(res, 404));
	} catch (error) {
		return res.status(400).json({success: false, error});
	}
}

/**
 * @method {filterDateTransaction}
 * @description: filter transaction (single user) with range timeStart => timeEnd
 * @param req
 * @param res
 */
export function filterDateTransaction(req, res) {
	try {
		//validate timeStart, timeEnd
		if (!req.body['timeStart'] || !req.body['timeEnd']
			|| !checkDate(req.body['timeStart'])
			|| !checkDate(req.body['timeEnd']))
			invalidParams(res);
		else {
			const timeStart = moment(`${req.body['timeStart']} 00:00:01`).toISOString();
			const timeEnd = moment(`${req.body['timeEnd']} 23:59:59`).toISOString();

			return Transaction.find({
				_user: req.user._id,
				createdAt: {
					'$gte': new Date(timeStart),
					'$lte': new Date(timeEnd)
				}
			}, '-_user').exec()
				.then(listTransaction => {
					if (listTransaction.length === 0)
						return res.status(404).json({
							success: false,
							message: constants.transaction.warning.search_transaction_empty
						});
					res.status(200).json({success: true, data: listTransaction});
				})
				.catch(validationError(res));
		}
	} catch (error) {
		return res.status(503).json({success: false, error});
	}
}

/**=========RESTRICTION: ADMIN MANAGE================================================================================*/

/**
 * @method {deleteTransaction}
 * @description delete item transaction
 * @param req
 * @param res
 * @returns {*}
 * @requires {admin}
 */
export function deleteTransaction(req, res) {
	try {
		if (!req.body._id || !IdValid(req.body._id)) invalidParams(res);
		return Transaction.findByIdAndRemove(req.body._id).exec()
			.then(message => res.status(204).end())
			.catch(validationError(res));
	}
	catch (error) {
		return res.status(400).json({success: false, error});
	}
}

/**
 * @method {getAllTransaction}
 * @description: get all transaction user
 * @returns {*|Authenticator}
 * @require {admin}
 */
export function getAllTransaction(req, res) {
	try {
		return Transaction.find({})
			.populate({
				path: '_user',
				select: 'email -_id',
			}).sort({$natural: 1})  //-1 decrease
			.skip(parseInt(req.query.start) || 0)
			.limit(parseInt(req.query.count) || 20).exec()
			.then(listTransaction => {
				if (listTransaction.length === 0)
					return res.status(400).json({
						success: false,
						error: constants.transaction.warning.system_is_empty
					});
				res.status(200).json({success: true, data: listTransaction})
			})
			.catch(validationError(res, 404));
	} catch (error) {
		return res.status(400).json({success: false, error});
	}
}

/**
 * @method {filterAllDateTransaction}
 * @description: filter transaction (all user) with range timeStart => timeEnd
 * @param req
 * @param res
 * @requires {admin}
 */
export function filterAllDateTransaction(req, res) {
	try {
		//validate timeStart, timeEnd
		if (!req.body['timeStart'] || !req.body['timeEnd']
			|| !checkDate(req.body['timeStart'])
			|| !checkDate(req.body['timeEnd']))
			invalidParams(res);
		else {
			const timeStart = moment(`${req.body['timeStart']} 00:00:01`).toISOString();
			const timeEnd = moment(`${req.body['timeEnd']} 23:59:59`).toISOString();

			return Transaction.find({
				createdAt: {
					'$gte': new Date(timeStart),
					'$lte': new Date(timeEnd)
				}
			}).exec()
				.then(listTransaction => {
					if (listTransaction.length === 0) return res.status(404).json({
						success: false,
						error: constants.transaction.warning.search_transaction_empty
					});
					res.status(200).json({success: true, data: listTransaction})
				})
				.catch(validationError(res));
		}
	} catch (error) {
		return res.status(503).json({success: false, error});
	}
}

/**
 * @method {checkDate}
 * @description: validate time request to client
 * @param dateTime
 * @returns {*|boolean}
 */
function checkDate(dateTime) {
	return moment(dateTime, 'YYYY-MM-DD', true).isValid();
}