/**
 * @author: ManhNV
 * @copyright: AdFast 2017- Mobile Solution
 * @description: traffic API
 * @define 12/19/2016.
 * @version: 1.0.0
 */
'use strict';

import express from 'express';
import * as controller from './traffic.controller';
import {isAuthenticated} from '../../auth/auth.service';
import {
	checkGetTimeStamp,
} from '../../components/app/middlewares/support.middleware';

let router = express.Router();

router.post('/', controller.createTraffic);
router.get('/', checkGetTimeStamp, isAuthenticated(), controller.filterTraffic);
router.get('/push_notification', isAuthenticated(), controller.pushNotification);

export default router;