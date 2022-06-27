/**
 * @author: ManhNV
 * @copyright: AdFast 2017- Mobile Solution
 * @description: site controller execute
 * @define 12/19/2016.
 * @version: 1.0.0
 */

'use strict';

import express from 'express';

import * as controller from './site.controller';
import {isAuthenticated, hasRoleAdmin} from '../../auth/auth.service';
import {
	checkGetTimeStamp,
	checkPostTimeStamp
} from '../../components/app/middlewares/support.middleware';


let router = express.Router();

router.get('/', checkGetTimeStamp, isAuthenticated(), controller.getUserSite);
router.post('/', checkPostTimeStamp, isAuthenticated(), controller.createSite);
router.put('/', checkPostTimeStamp, isAuthenticated(), controller.updateSite);
router.delete('/', checkPostTimeStamp, isAuthenticated(), controller.deleteSite);

//role admin
router.get('/all-site', checkGetTimeStamp, hasRoleAdmin(), controller.getAllSite);

export default router;