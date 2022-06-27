/**
 * @author: ManhNV
 * @copyright: AdFast 2017- Mobile Solution
 * @description: plan api
 * @define 12/25/2016.
 * @version: 1.0.0
 */

'use strict';

import express from 'express';
let router = express.Router();

import * as controller from './plan.controller';
import {hasRoleAdmin, isAuthenticated} from '../../auth/auth.service';
import {checkGetTimeStamp, checkPostTimeStamp} from '../../components/app/middlewares/support.middleware';

router.get('/', checkGetTimeStamp, isAuthenticated(), controller.getPlan);

//permission administrator
router.post('/', checkPostTimeStamp, hasRoleAdmin(), controller.createPlan);
router.delete('/', checkPostTimeStamp, hasRoleAdmin(), controller.deletePlan);
router.put('/', checkPostTimeStamp, hasRoleAdmin(), controller.updatePlan);

export default router;