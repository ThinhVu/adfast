/**
 * @author: ManhNV
 * @copyright: AdFast 2017- Mobile Solution
 * @description: transaction API
 * @define 12/24/2016.
 * @version: 1.0.0
 */

'use strict';

import express from 'express';
let router = express.Router();

import * as controller from './transaction.controller';
import * as auth from '../../auth/auth.service';
import {checkGetTimeStamp, checkPostTimeStamp} from '../../components/app/middlewares/support.middleware';

//permission: user normal
router.get('/', checkGetTimeStamp, auth.isAuthenticated(), controller.getCurrentUserTransaction);
router.post('/', checkPostTimeStamp, auth.isAuthenticated(), controller.createTransaction);
router.post('/filter', checkPostTimeStamp, auth.isAuthenticated(), controller.filterDateTransaction);

//permission: admin
router.get('/get-all', checkGetTimeStamp, auth.hasRoleAdmin(), controller.getAllTransaction);
router.delete('/', checkPostTimeStamp, auth.hasRoleAdmin(), controller.deleteTransaction);
router.post('/filter-all', checkPostTimeStamp, auth.hasRoleAdmin(), controller.filterAllDateTransaction);

export default router;