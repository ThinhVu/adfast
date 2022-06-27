/**
 * @author: ManhNV
 * @copyright: AdFast 2017- Mobile Solution
 * @description: define traffic model
 * @define 12/18/2016.
 * @version: 1.0.0
 */

'use strict';
import atob from 'atob';

import Traffic from "./traffic.model";
import Site from "../site/site.model";
import Package from "../package/package.model";
import MsisdnMap from '../msisdnMap/msisdn_map.model';
import {
	validationError,
	invalidParams
} from "../../components/app/middlewares/support.middleware";
import constants from '../../components/app/constants/constant';
import * as trafficServices from './traffic.service';

let ObjectId = require('mongoose').mongo.ObjectId;

/**
 * @method {createTraffic}
 * @description: create new traffic
 * @param req
 * @param res
 */
export function createTraffic(req, res) {
	//Todo setup lại domain
	let domain = req.headers["referer"].match(/https?:\/\/[\w.:]+\//g)[0];
	//bỏ qua check tham số hợp lệ, bỏ qua check timestamp
	return Site.findOne({url: domain}, function (error, site) {
		if (site && site.usedPhone < site.maxPhone && site.isActive) {
			//insert into msisdnMap , mac dinh tham so r luon luon ton tai
			//Todo remove
			console.log("=============== day la so dien thoai===============");
			console.log(req.body.r);
			console.log(atob(req.body.r));
			console.log("=============== day la so dien thoai the end===============");

			const dataRequest = JSON.parse(atob(req.body.r));

			//Todo thay lai data Request
			//Todo remove sau khi test
			/*const dataRequest = {
			 phone: '011111234343',
			 carrier: 'VietTel',
			 url : 'http://takeit.vn/promaster',
			 referrer : 'http//dantri.com',
			 os :'Android',
			 mobile : 'Điện Thoại Mạnh Hip',
			 city : 'Hà Nội'
			 };
			 */

			saveMsisdnMap(req, dataRequest);
			return createNewTraffic(site, dataRequest, res);
		} else { /*error*/
			return res.status(400).end();
		}
	});
}

/**
 * @method {filterTraffic}
 * @description: filter traffic with range field requestTime
 * @param req
 * @param res
 */
export function filterTraffic(req, res) {
	//default filter max 50 rows
	const limitTo = parseInt(req.query.count || 50) > 50 ? 50 : parseInt(req.query.count);
	if (!req.query.action) invalidParams(res);
	else switch (req.query.action) {
		case 'filter-all':
			filterAllTraffic(req, limitTo, res);
			break;
		case 'export-all':
			return exportAllTrafficHasUser(req, res);
			break;
		case 'filter-site':
			if (!req.query["site-name"]) invalidParams(res);
			else return filterSiteTraffic(req, limitTo, res);
			break;
		case 'count-all':
			return countAllSiteHasUser(req, res);
			break;
		case 'count-site':
			if (!req.query["site-name"]) invalidParams(res);
			else return countSite(req, res);
			break;
		default:
			invalidParams(res);
			break;
	}
}

/**
 * @method {pushNotification}
 * @param req
 * @param res
 */
export function pushNotification(req, res) {
	trafficServices.getMessageTimeInterval()
		.then(traffic => res.status(200).json({success: true, traffic}))
		.catch(validationError(res));
}

/*Support function Create Traffic ==============================================================*/
/**
 * @method {saveMsisdnMap}
 * @description: save table msisdnMap
 * @param req
 * @param dataRequest
 */
function saveMsisdnMap(req, dataRequest) {
	const msisdnMap = new MsisdnMap({
		ip: req.connection.remoteAddress || req._remoteAddress,
		msisdn: dataRequest.phone, //phone
		carrier: dataRequest.carrier,
		os: dataRequest.os,
		mobile: dataRequest.mobile,
		city: dataRequest.city,
		dateCreate: new Date()
	});
	msisdnMap.save();
}

/**
 * @method {createNewTraffic}
 * @description: update traffic site
 * @summary: update traffic, if traffic is insert =>
 *      update package (phoneRemain),
 *      update site (usedPhone)
 *  else: res 204
 * @param site
 * @param dataRequest
 * @param res
 * @returns {Query|*}
 */
function createNewTraffic(site, dataRequest, res) {
//update in Traffic
	return Package.findOne({_user: site._user}, function (err, pkg) {
		//chac chan page khi nay la da có pkg
		if (pkg && pkg.phoneRemain > 0) {
			//use findOneAndUpdate => return data
			//use update => return state n, nModified, ok
			console.log(dataRequest);
			return Traffic.update(
				{phone: dataRequest.phone, _site: site._id},
				{
					$set: {
						_site: site._id,
						_user: site._user,
						phone: dataRequest.phone,
						carrier: dataRequest.carrier,
						url: dataRequest.url,
						referrer: dataRequest.referrer,
						os: dataRequest.os,
						mobile: dataRequest.mobile,
						city: dataRequest.city,
						requestTime: new Date(),
					},
					$inc: {accessNumber: 1},
				},
				{upsert: true},
				function (err, data) {
					//data upsert => change phoneRemain, usedPhone
					if (data.nModified === 0) {
						//dua pkg len dau de cho node-schedule thuan loi hon
						pkg.phoneRemain -= 1;
						pkg.save();
						site.usedPhone += 1;
						site.save();
						res.status(204).end();
					}
					//1hour request 1 lan => dieu kien nay it su dung
					else if (data.nModified === 1) {
						res.status(204).end();
					}
					else return res.status(400).end();
				});
		} else {
			return res.status(400).json({err});
		}
	});
}

/*Support function FilterTraffic ==============================================================*/
/**
 * @method {countAllSiteHasUser}
 * @description: count all site has user point (user login)
 * @param req
 * @param res
 */
function countAllSiteHasUser(req, res) {
	const carrierCondition = req.query.carrier != null ? {$eq: req.query.carrier} : {$ne: ''};
	return Traffic.count({_user: req.user._id, carrier: carrierCondition})
		.exec()
		.then(count => {
			res.status(200).json({success: true, data: count});
		}).catch(validationError(res));
}

/**
 * @method {filterAllTraffic}
 * @description: filter all traffic user login system
 * @param req
 * @param limitTo
 * @param res
 */
function filterAllTraffic(req, limitTo, res) {
	const carrierCondition = req.query.carrier != null ? {$eq: req.query.carrier} : {$ne: ''};
	return Traffic.find({_user: req.user._id, carrier: carrierCondition})  //user is not ObjectId
		.populate({
			path: '_site',
			select: '-_id name'
		})
		.skip(parseInt(req.query.start || 0))
		.limit(limitTo)
		.sort({requestTime: -1})
		.exec()
		.then(listTraffic => {
			if (listTraffic.length !== 0) {
				res.status(200).json({success: true, data: listTraffic});
				//status 404
			} else return res.status(204).json({
				success: false,
				error: constants.traffic.warning.cannot_find_traffic
			});
		})
		.catch(validationError(res));
}

/**
 * @method {countSite}
 * @description: count item in site with field: site name
 * @param req
 * @param res
 * @returns {*}
 */
function countSite(req, res) {
	return Site.findOne({name: req.query["site-name"]}).exec()
		.then(site => {
			if (site) {
				const carrierCondition = req.query.carrier != null ? {$eq: req.query.carrier}
					: {$ne: ''};
				Traffic.count({_site: site._id, _user: req.user._id, carrier: carrierCondition})
					.exec()
					.then(count => {
						res.status(200).json({success: true, data: count});
					}).catch(validationError(res));
			} else {
				//status 404
				return res.status(204).json({
					success: false,
					error: constants.traffic.warning.not_site_filter
				});
			}
		}).catch(validationError(res));
}

/**
 * @method {filterSiteTraffic}
 * @description: filter with field name site
 * @param req
 * @param limitTo
 * @param res
 * @returns {*}
 */
function filterSiteTraffic(req, limitTo, res) {
	return Site.findOne({name: req.query["site-name"], _user: ObjectId(req.user._id),})
		.exec()
		.then(site => {
			if (site) {
				const carrierCondition = req.query.carrier != null ? {$eq: req.query.carrier}
					: {$ne: ''};
				Traffic.find({_site: site._id, carrier: carrierCondition})
					.skip(parseInt(req.query.start || 0))
					.limit(limitTo)
					.sort({requestTime: -1})
					.exec()
					.then(listTraffic => {
						if (listTraffic && listTraffic.length > 0) res.status(200).json({
							success: true,
							data: listTraffic
						});
						//status 404
						else res.status(204).json({
							success: false,
							error: constants.traffic.warning.not_found_traffic_from_this_site
						});
					}).catch(validationError(res));
			} else {
				//status 404
				return res.status(204).json({
					success: false,
					error: constants.traffic.warning.not_site_filter
				});
			}
		}).catch(validationError(res));
}

/**
 * @method {export AllTrafficHasUser}
 * @description: support export excel data
 * @param req
 * @param res
 * @returns {*}
 */
function exportAllTrafficHasUser(req, res) {
	return Traffic.find({_user: req.user._id})  //user is not ObjectId
		.populate({
			path: '_site',
			select: '-_id name'
		})
		.exec()
		.then(listTraffic => {
			if (listTraffic.length !== 0) {
				res.status(200).json({success: true, data: listTraffic});
				//status 404
			} else return res.status(204).json({
				success: false,
				error: constants.traffic.warning.not_found_data_export
			});
		})
		.catch(validationError(res));
}