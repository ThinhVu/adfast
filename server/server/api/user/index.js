/**
 * @author: ManhNV
 * @copyright: AdFast 2017- Mobile Solution
 * @description: user API
 * @define 12/21/2016.
 * @version: 1.0.0
 */

import express from 'express';

import * as auth from '../../auth/auth.service';
import * as controller from './user.controler';
import {
	checkGetTimeStamp,
	checkPostTimeStamp,
	checkGetTimeStampEmail
} from '../../components/app/middlewares/support.middleware';

let router = express.Router();

//permission: user normal
router.post('/', checkPostTimeStamp, auth.isNotLoginApi(), controller.signUser);

router.put('/', checkPostTimeStamp, auth.isAuthenticated(), controller.updateUser);
router.put('/change-pass', checkPostTimeStamp, auth.isAuthenticated(), controller.changePassword);
router.get('/profile', checkGetTimeStamp, auth.isAuthenticated(), controller.getProfileUser);
router.get('/email-active', checkGetTimeStampEmail, controller.activeWithEmail);
router.post('/forgot-password', checkPostTimeStamp, controller.forgotPassword);

//permission: admin
router.get('/', checkGetTimeStamp, auth.hasRoleAdmin(), controller.getListUser);
router.put('/is-lock', checkPostTimeStamp, auth.hasRoleAdmin(), controller.isLockUser);
router.put('/is-active', checkPostTimeStamp, auth.hasRoleAdmin(), controller.isActive);

//rank-b => switch system automatic user update budget => switch permission admin to user normal
router.put('/change-budget', checkPostTimeStamp, auth.hasRoleAdmin(), controller.changeBudget);

export default router;