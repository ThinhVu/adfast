/**
 * @author: ManhNV
 * @copyright: AdFast 2017- Mobile Solution
 * @description: package api
 * @define 12/29/2016.
 * @version: 1.0.0
 */

'use strict';

import express from 'express';

import * as controller from './package.controller';
import {isAuthenticated, hasRoleAdmin} from '../../auth/auth.service';
import {
	checkGetTimeStamp,
	checkPostTimeStamp
} from '../../components/app/middlewares/support.middleware';


let router = express.Router();

router.get('/', checkGetTimeStamp, isAuthenticated(), controller.getPackage);

//administrator
router.get('/get-all', checkGetTimeStamp, hasRoleAdmin(), controller.getAllPackage);
router.post('/', checkPostTimeStamp, hasRoleAdmin(), controller.createPackage);
router.put('/', checkPostTimeStamp, hasRoleAdmin(), controller.updatePackage);

export default router;