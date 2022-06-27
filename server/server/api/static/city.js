/**
 * Created by NguyenManh on 7/29/2016.
 * */
'use strict';

import express from 'express';
import path from 'path';

import config from '../../config/environment';

let router = express.Router();

router.get('/', (req, res) => {
	res.sendFile(path.resolve(config.root, 'server/public/data/api_data/city.json'));
});

router.get('/:id_city/district', (req, res) => {
	res.sendFile(path.join(config.root, `server/public/data/api_data/district/${req.params.id_city}.json`));
});

export default router;
