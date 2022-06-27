'use strict';

import express from 'express';
import passport from 'passport';

import {isNotLoginApi, signToken} from '../auth.service';
import * as constants from '../../components/app/constants/constant';
import {checkPostTimeStamp} from '../../components/app/middlewares/support.middleware';

let router = express.Router();

router.post('/login', function (req, res, next) {
	passport.authenticate('local-login', function (err, user, information) {
		const error = err || information;
		if (error) return res.status(400).json({success: false, error});

		if (!user) return res.status(404).json({
			success: false,
			error: constants.error.authenticate_fail
		});
		const token = signToken(user.token);
		res.cookie('token', token);
		//create token =>exec client: -call token with redirect to
		res.status(200).json({success: true, token});
	})(req, res, next);
});

export default router;