/**
 * Created by ManhNV on 12/23/2016.
 */

import express from 'express';
let router = express.Router();

router.use('/city', require('./city').default);

export default router;