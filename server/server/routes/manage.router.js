/**
 * Description: router manage include: manage-- account, studio, login, logout ...
 * Note: all router check pass middleware isLogin or isNotLogin
 * Create by: ManhNV
 */
'use strict';

import path from 'path';
import config from '../config/environment';

export default function (app) {

	app.get('/logout', (req, res) => {
		res.clearCookie('token');
		res.redirect('/');
	});

	app.get('/clear-token', (req, res) => {
		res.clearCookie('token');
		res.redirect('/');
	});

	if(config.env === 'development'){
    app.get('/*', (req, res) => {
      "use strict";
      // res.sendFile(path.resolve(app.get('clientPath'), 'index.view.html'));
      res.render(path.resolve(app.get('clientPath'), 'index.view.html'), {title: app.get('env')});
    });
	}
};