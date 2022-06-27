/**
 * Description: Test router
 * Use: Environment = development
 * Create by: ManhNV
 */
'use strict';
import config from '../config/environment';
import {error_path} from '../config/static.config';

export default function (app) {
	//TODO move route static
	app.get('/403.html', (req, res) => {
		res.sendFile(error_path.Page403);
	});

	app.get('/test', (req, res) => {
		console.log('test');
		res.json({success: true, message: 'Xac thuc pass qua isLoggerIn!'})
	});

	app.get('/testCookie', (req, res) => {
		res.cookie('phone', '121212');
		res.json({success: true, message: 'test cookie success'})
	});

	app.get('/testphone', (req, res) => {
		res.status(200).json({data: req.headers});
	});

	app.get('/hoangdnhduc', (req, res) => {
		res.render("app/components/landing-page/test-phone.html")
	});

	app.get('/demo', (req, res) => {
		res.sendFile(`${app.get('clientPath')}/test/index.test.html`);
	});

	app.get('/demo/*', (req, res) => {
		res.sendFile(`${app.get('clientPath')}/test/index.test.html`);
	});
}