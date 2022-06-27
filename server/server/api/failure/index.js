/**
 * @author: ManhNV
 * @copyright: AdFast 2017- Mobile Solution
 * @description: Api Failure
 * @define 06/01/2017.
 * @version: 1.0.0
 */

import express from 'express';
import * as controller from './failure.controller';
import {createTraffic} from '../traffic/traffic.controller';
import {hasRoleAdmin} from '../../auth/auth.service';

let router = express.Router();

router.post('/error', controller.createFailure);
router.post('/success', createTraffic);

router.delete('/failure', hasRoleAdmin(), controller.deleteFailure);

export default router;