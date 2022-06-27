/**
 * Config Express
 * Create by: ManhNV11
 * Check style: ESLint and JSHint
 */
'use strict';

import express from 'express';
import favicon from 'serve-favicon';
import logger from 'morgan';  //log in env: dev
import bodyParser from 'body-parser'; //parse post data
import compress from 'compression'; //use gzip file
import cookieParser from 'cookie-parser';
import path from 'path';
import config from './environment';
import session from 'express-session';
import ms from 'ms';
let MongoStore = require('express-session-mongo');
//support many scenario authenticate (facebook, google, local, git ...vv)
import passport from 'passport';

export default function (app) {
	const env = app.get('env'); //set env form app.js

	if (env === "development") {
		app.use(logger('dev'));
	}

	if (env === "production") {
		app.use(logger('combined'));
		app.use(favicon(path.join(config.root, 'server/public/images/favicon.ico')));
	}

	/*config client*/
	app.set('clientPath', path.join(config.clientPath));
	app.use(express.static(app.get('clientPath'), {
		etag: true,
		lastModified: true,
		maxAge: ms('1d')
	}));

	/*config view engine*/
	app.set('views', `${config.root}/server/views`);
	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');
	app.use(compress()); //use compress file vs gzip

	/*parser body and cookie, session*/
	app.use(bodyParser.json()); //support content-type:'application/json'
	/*support content-type: 'application/x-www-form-urlencoded'*/
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(cookieParser()); //support send cookie save information and parse cookie
	app.use(passport.initialize()); //support initial req.session.passport

	/*Session not save database, because use authenticate with json web token*/
	app.use(session({
		secret: config.secret.session,
		saveUninitialized: false,
		resave: false,
		store: new MongoStore() //avoid is memory lack
	}));

	if (env === "development") {
		app.use(require('errorhandler')());//Error handle
	}
}