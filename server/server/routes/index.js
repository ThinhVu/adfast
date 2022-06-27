/**
 * Description: config all routes application
 * Created by NguyenManh on 8/9/2016.*/
'use strict';

import {isAuthenticated} from '../auth/auth.service';
import staticRouter from './static.router';
import adminRoutes from './manage.router';
import cors from 'cors';
import express from 'express';
let router = express.Router();

export default function (app) {
	//Todo setup not access origin
	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
		next();
	});

	router.get('/authenticate', isAuthenticated(), (req, res) => {
		res.status(200).json({success: true, message: 'authenticate success!', user: req.user});
	});

	app.use(router);

	//config routes api and auth
	app.use(require('../auth').default);
	app.use('/api', require('../api/static').default);
	app.use('/api/user', require('../api/user').default);
	app.use('/api/plan', require('../api/plan').default);
	app.use('/api/site', require('../api/site').default);
	app.use('/api/package', require('../api/package').default);
	app.use('/api/transaction', require('../api/transaction').default);
	app.use('/traffic', require('../api/traffic').default);
	app.use('/report', require('../api/failure').default);
	app.get('/data', (req, res) => {
		console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
		console.log('test');
		res.json({success: true, data: "That ko the nao tin noi!"});
	});
	app.post('/xyz', (req, res) => {
		res.json({message: 'OK'});
	});

	//config routes
	app.use(staticRouter);
	adminRoutes(app);

	//pass api not exist
	app.use((req, res) => {
		res.status(400).json({message: 'not exist router'});
	});

	if (app.get('env') === 'development') {
		require('./test.router').default(app);
	}
};