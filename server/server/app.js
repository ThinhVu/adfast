/**
 * Create by: ManhNV11
 * Des: Config Main application file
 * Check style: ESLint and JSHint
 */
'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import config from './config/environment';
import http from 'http'; //module core in node-js
import StringBuilder from 'stringbuilder';
StringBuilder.extend('string'); //extension method from StringBuilder

//Connect to mongodb
require('./config/mongo-connect').default(config, mongoose);

//Setup server
let app = express();
app.set('env', config.env);
let server = http.createServer(app);
let print = console.log;

require('./config/express').default(app);
require('./routes').default(app);

app.startServer = function startServer() {
	server.listen(config.port, config.ip, () => {
		print(server.address());
		print("Server listening on port: {0}, in {1} mode".format(config.port, app.get('env')));
	});
};

app.startServer();

module.exports = app;
