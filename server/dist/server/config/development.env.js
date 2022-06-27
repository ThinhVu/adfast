'use strict';
var path = require('path');
module.exports = {
	DOMAIN: 'http://localhost:8585',
	SESSION_SECRET: 'master-js_development-development',
	CLIENT_PATH: path.join(__dirname, '../../client/src'),
	FACEBOOK_ID: 'app-id',
	FACEBOOK_SECRET: 'app-secret',
	GOOGLE_ID: 'app-id',
	GOOGLE_SECRET: 'app-secret'
};