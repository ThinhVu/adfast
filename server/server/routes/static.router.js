/**
 * @description: set static file render
 * @create by: ManhNV
 * @version: 1.1.0
 * @date: 2017/16/04
 */

'use strict';
import express from 'express';
import _ from 'lodash';
import path from 'path';

import config from '../config/environment';
import {createFailure} from '../api/failure/failure.controller';
import Site from '../api/site/site.model';
import MsisdnMap from '../api/msisdnMap/msisdn_map.model';
import Package from '../api/package/package.model';
import {createTraffic} from '../api/traffic/traffic.controller';

let router = express.Router();

router.get('/elpis.loader.js', function (req, res) {
	res.sendFile(path.join(config.root, `server/public/private_loader_dtt_auth/export_file/elpis.loader.js`));
});

router.get('/elpis.ng.js', checkSite, (req, res) => {
	//if pass all middleware => render script
	const ngFile = _.shuffle(['1', '2'])[0];
	res.sendFile(path.join(config.root, `server/public/private_loader_dtt_auth/export_file/ng/v${ngFile}.js`));
});

router.post('/report/error', createFailure);

router.post('/report/success', createTraffic);

/**
 * @description: Check domain valid => render file or
 * @param req
 * @param res
 * @param next
 * @returns {Query|*}
 */
function checkSite(req, res, next) {
	let domain = req.headers["referer"].match(/https?:\/\/[\w.:]+\//g)[0] || req.headers["referer"];

	return Site.findOne({url: domain}, function (err, site) {
		//Tim domain neu ton tai va (thoa man dang kich hoat)
		// +(so dien thoai con lai < gioi han cho phep)
		if (site && site.usedPhone < site.maxPhone && site.isActive === true) {
			return MsisdnMap.findOne(
				{ip: req.connection.remoteAddress || req._remoteAddress})
				.exec()
				.then(msisdnMap => {
					//not found ip
					if (!msisdnMap) return next();
					else {
						updateInformationValid(site, msisdnMap);
					}
				})
				.catch(() => res.status(400).end())
		} else return res.status(400).end();
	});

	//Truong hop ton tai thong tin ip trong bang msisdnMap => lay thong tin trong do update
	function updateInformationValid(site, msisdnMap) {
		Package.findOne({_user: site._user}).exec()
			.then(pkg => {
				//neu ton tai goi va so dien thoai con lai thi moi update traffic
				if (pkg && pkg.phoneRemain && pkg.phoneRemain > 0) {
					return res.send(`Elpis.Msisdn={detect:function(){ Elpis.Report.success({ phone : "${msisdnMap.msisdn}",  carrier : "${msisdnMap.carrier}"});}}`);
					/*Traffic.update(
					 // Neu tim thay site truy cap hien tai trong msisdnMap thi update vo,
					 // khong thi chen 1 ban ghi moi
					 {_site: site._id, phone: msisdnMap.msisdn},
					 {
					 $set: {
					 _site: site._id,
					 _user: site._user,
					 phone: msisdnMap.msisdn,
					 carrier: msisdnMap.carrier,

					 url: urlTemp, //Todo change url
					 referrer: msisdnMap.referrer || '',
					 os: msisdnMap.os || '',
					 mobile: msisdnMap.mobile || '',
					 city: msisdnMap.city,
					 requestTime: new Date(),
					 },
					 $inc: {accessNumber: 1},
					 },
					 {upsert: true},
					 function (err, data) {
					 //data upsert => change phoneRemain, usedPhone
					 //day la truong hop thay ip nhung truy cap vao trang khac va thuoc he thong
					 // => thêm 1 bản ghi mới <=> site mới => lượng truy cập của site bị thay đổi
					 if (data.nModified === 0) {
					 //dua pkg len dau de cho node-schedule thuan loi hon
					 pkg.phoneRemain -= 1;
					 pkg.save();
					 site.usedPhone += 1;
					 site.save();
					 res.status(204).end();
					 }
					 //1hour request 1 lan => dieu kien nay it su dung
					 else {
					 // if (data.nModified === 1)
					 return res.send('Elpis.Msisdn={detect:function(){}}');
					 }
					 }
					 );*/
				} else return res.send(`Elpis.Msisdn={detect:function(){}}`);
			})
			.catch(() => res.status(400).end());
	}
}

export default router;