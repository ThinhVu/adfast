/**
 * @author: ManhNV
 * @copyright: AdFast 2017- Mobile Solution
 * @description: site controller execute
 * @define 12/19/2016.
 * @version: 1.0.0
 */

'use strict';

import Site from './site.model';
import constants from '../../components/app/constants/constant';
import {
	validationError,
	invalidParams
} from '../../components/app/middlewares/support.middleware';

let ObjectId = require('mongoose').mongo.ObjectId;
let IdValid = require('mongoose').Types.ObjectId.isValid;

/**
 * @method {createSite}
 * @description create new site
 * @param req
 * @param res
 * @returns {*}
 */
export function createSite(req, res) {
	try {
		let patternMaxPhone = /^\d+$/g;
		let patternNumberActive = /^\d+$/g; //ma script dung chung se bi true-false lan lon
		let regUrl = /^https?:\/\/[\w-]+\.\w+(.\w+.\w{0,7})?\/$/g;
		if (!req.body.name || !req.body.url || !req.body.category
			|| !req.body.isActive || !req.body.maxPhone
			|| !patternMaxPhone.test(req.body.maxPhone)
			|| !patternNumberActive.test(req.body.isActive)
			|| !regUrl.test(req.body.url.trim())) {
			invalidParams(res);
		}
		else {
			//validate url duplicate
			return Site.findOne({
				$or: [
					{url: req.body.url.trim()},
					{name: req.body.name.trim()}
				]
			}).exec()
				.then(siteExist => {
					if (siteExist)
						return res.status(400).json({
							success: false,
							error: constants.site.warning.site_url_has_register
						});
					//not exist site => save db
					const site = new Site({
						_user: req.user._id,
						name: req.body.name,
						url: req.body.url,
						category: req.body.category.split(','),
						isActive: req.body.isActive === '1',
						maxPhone: parseInt(req.body.maxPhone)
					});
					return site.save()
						.then(site_create => res.status(200).json({success: true, data: site_create}))
						.catch(validationError(res));
				}).catch(validationError(res));
		}
	} catch (error) {
		return res.status(400).json({success: false, error});
	}
}

/**
 * @method {getUserSite}
 * @description: get site user login
 * @param req
 * @param res
 */
export function getUserSite(req, res) {
	try {
		return Site.find({_user: ObjectId(req.user._id)}).exec()
			.then(listSite => {
				if (listSite.length === 0)
					return res.status(404).json({
						success: false,
						error: constants.site.warning.user_not_register_site
					});
				res.status(200).json({success: true, data: listSite});
			}).catch(validationError(res));
	} catch (error) {
		return res.status(400).json({success: false, error});
	}
}

/**
 * @method {getAllSite}
 * @description: get all site in system
 * @param req
 * @param res
 * @requires {admin}
 */
export function getAllSite(req, res) {
	try {
		return Site.find({}).exec()
			.then(listSite => {
				if (listSite.length === 0) return res.status(404).json({
					success: false,
					error: constants.site.warning.system_not_register_site
				});
				res.status(200).json({success: true, data: listSite});
			}).catch(validationError(res));
	} catch (error) {
		return res.status(400).json({success: false, error})
	}
}

/**
 * @method {updateSite}
 * @description: update site with field isActive, maxPhone
 * @param req
 * @param res
 */
export function updateSite(req, res) {
	try {
		if (!req.body.action || !req.body._id || !IdValid(req.body._id))
			invalidParams(res);
		else {
			switch (req.body.action) {
				case 'active':
					activeSite(req, res);
					break;
				case 'deactive':
					activeSite(req, res);
					break;
				case 'max-phone':
					updateMaxPhone(req, res);
					break;
				default:
					invalidParams(res);
					break;
			}
		}
	} catch (error) {
		return res.status(400).json({success: false, error});
	}
}

/**
 * @method {deleteSite}
 * @summary: Chỉ được xóa khi chiến dịch chưa thu thập được thuê bao nào
 * @param req
 * @param res
 */
export function deleteSite(req, res) {
	try {
		if (!req.body._id || !IdValid(req.body._id)) invalidParams(res);
		else {
			return Site.findOne({_id: ObjectId(req.body._id), _user: ObjectId(req.user._id)}).exec()
				.then(site => {
					if (!site) return res.status(404).json({
						success: false,
						error: constants.site.warning.not_exist_site_system
					});
					else if (site.usedPhone !== 0) {
						return res.status(400).json({
							success: false,
							error: constants.site.error.cannot_remove_site
						});
					} else {
						return site.remove()
							.then(() => res.status(200).json({
								success: false,
								message: constants.site.success.remove_site_success
							}))
							.catch(validationError(res));
					}
				});
		}
	} catch (error) {
		return res.status(400).json({success: false, error});
	}
}


/**Function support controller api*/
/**
 * @method {isActive}
 * @description: update field isActive <=> user active site
 * @summary: If site is-active => send request to traffic accept
 *  else => reject request <=> not save phone to traffic
 * @param req
 * @param res
 * @requires {admin}
 */
function activeSite(req, res) {
	try {
		return Site.findOne(
			{
				_id: ObjectId(req.body._id),
				_user: ObjectId(req.user._id)
			}).exec()
			.then(site => {
				if (!site) return res.status(404).json({
					success: false,
					error: constants.site.error.system_not_exist_site_active
				});
				site.isActive = (req.body.action === 'active');
				return site.save()
					.then(() => res.status(200).json({
						success: true,
						message: (req.body.action === 'active')
							? constants.site.success.active_site_success
							: constants.site.success.deactive_site_success
					}))
					.catch(validationError(res));
			})
			.catch(validationError(res));
	} catch (error) {
		return res.status(400).json({success: false, error});
	}
}

/**
 * @method {updateSite}
 * @description: update field updateSite
 * @param req
 * @param res
 */
function updateMaxPhone(req, res) {
	try {
		let patternMaxPhone = /^\d+$/g;
		if (!req.body.maxPhone || !patternMaxPhone.test(req.body.maxPhone))
			invalidParams(res);
		else {
			const maxPhoneNumber = parseInt(req.body.maxPhone);
			return Site.findOne(
				{
					_id: ObjectId(req.body._id),
					_user: ObjectId(req.user._id)
				})
				.exec()
				.then(site => {
					if (!site) return res.status(404).json({
						success: false,
						error: constants.site.error.cannot_site_update
					});
					//validate maxPhone > usedPhone
					else if (maxPhoneNumber <= site.usedPhone) return res.status(400).json({
						success: false,
						error: constants.site.error.max_phone_invalid
					});
					//update maxPhone
					else {
						site.maxPhone = maxPhoneNumber;
						return site.save(function (error) {
							if (error) return res.status(400).json({success: false, error});
							res.status(200).json({
								success: true,
								message: constants.site.success.update_subscribers_unlimited_success
							});
						}).catch(validationError(res));
					}
				}).catch(validationError(res));
		}
	}
	catch (error) {
		return res.status(400).json({success: false, error})
	}
}