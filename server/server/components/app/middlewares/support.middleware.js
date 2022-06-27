/**
 * Created by ManhNV on 12/15/2016.
 */

// import jwt from 'jsonwebtoken';
import crypt_md5 from 'md5';
import sha512 from 'crypto-js/sha512';

import constants from '../constants/constant';
import config from '../../../config/environment';

/*export async function remainTimeToken(userDecoded) {
 return await Math.floor(((new Date(userDecoded['iat'] * 1000)) - (new Date())) / 1000);
 }

 export function boolValidToken(token) {
 jwt.verify(token, config.secret.session, (err) => {
 return !err;
 });
 }

 export function removeUnicodeVi(str) {
 str = str.toLowerCase();
 str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
 str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
 str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
 str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
 str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
 str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
 str = str.replace(/đ/g, "d");
 return str.trim();
 }

 export function removeUnicodeViWhiteSpace(str) {
 str = str.toLowerCase();
 str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
 str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
 str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
 str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
 str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
 str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
 str = str.replace(/đ/g, "d");
 return str.replace(/(\s)/g, "");
 }*/

/**
 * @method {validationError}
 * @param res
 * @param statusCode
 * @returns {Function}
 */
export function validationError(res, statusCode = 422) {
	return function (error) {
		res.status(statusCode).json({success: false, error});
	};
}

/**
 * @method {validationCatchError}
 * @param deferred
 * @returns {Function}
 */
export function validationCatchError(deferred) {
	"use strict";
	return function (error) {
		deferred.reject(`${error.name}: ${error.message}`);
	}
}

/**
 * @method {invalidParam}
 * @param res
 * @param statusCode
 */
export function invalidParams(res, statusCode = 400) {
	return res.status(statusCode).json({success: false, message: constants.warning.invalid_param});
}

/**
 * @method {checkPostTimeStamp}
 * @param req
 * @param res
 * @param next
 */
export function checkPostTimeStamp(req, res, next) {
	const reg = /\d{10,11}$/g;
	if (!req.body.k || !req.body.t || !reg.test(req.body.t.trim())) {
		invalidParams(res);
	} else {
		//600s <=> 10 minute expires time
		const remainTime = Math.floor((new Date() - new Date(req.body.t * 1000)) / 1000);
		if (remainTime > config.timeExpire) {
			return res.status(400).json({success: false, error: 'time expires'});
		} else {
			const keyPass = crypt_md5(`${config.keyValidate}${req.body.t}`);
			if (keyPass === req.body.k) {
				next();
			} else {
				return res.status(400).json({success: false, error: 'key invalid', config});
			}
		}
	}
}

/**
 * @method {checkGetTimeStamp}
 * @param req
 * @param res
 * @param next
 */
export function checkGetTimeStamp(req, res, next) {
	const reg = /\d{10,11}$/g;
	if (!req.query.k || !req.query.t || !reg.test(req.query.t.trim())) {
		invalidParams(res);
	} else {
		//600s <=> 10 minute expires time
		const remainTime = Math.floor((new Date() - new Date(req.query.t * 1000)) / 1000);
		if (remainTime > config.timeExpire) {
			return res.status(400).json({success: false, error: 'time expires'});
		} else {
			const keyPass = crypt_md5(`${config.keyValidate}${req.query.t}`);
			if (keyPass == String(req.query.k)) {
				next();
			} else {
				return res.status(401).json({success: false, error: 'key invalid'});
			}
		}
	}
}

/**
 * @method {checkGetTimeStampEmail}
 * @param req
 * @param res
 * @param next
 */
export function checkGetTimeStampEmail(req, res, next) {
	const reg = /\d{10,11}$/g;
	if (!req.query.k || !req.query.t || !reg.test(req.query.t.trim())) {
		invalidParams(res);
	} else {
		//600s <=> 10 minute expires time
		const remainTime = Math.floor((new Date() - new Date(req.query.t * 1000)) / 1000);
		if (remainTime > config.email.timeExpireActive) {
			return res.status(404).json({
				success: false, error: 'Thời gian kích hoạt tài khoản đã vượt quá 3 ngày! Vui' +
				' lòng kích hoạt lại tài khoản từ hệ thống AdFast hoặc liện hệ bộ phận support để được hỗ trợ!'
			});
		} else {
			const keyPass = sha512(`${config.email.keyValidateSendMail}${req.query.t}`);
			if (keyPass == String(req.query.k)) {
				next();
			} else {
				invalidParams(res);
			}
		}
	}
}