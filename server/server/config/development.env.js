'use strict';
const path = require('path');

/*development config*/
module.exports = {
	/*Domain: use create app and requestToCallback Url Authenticate G+, Facebook*/
	DOMAIN: 'http://localhost:8585',
	SESSION_SECRET: 'master-js_development-development',
	CLIENT_PATH: path.join(__dirname, '../../client/src'),

	FACEBOOK_ID: 'app-id',
	FACEBOOK_SECRET: 'app-secret',

	GOOGLE_ID: 'app-id',
	GOOGLE_SECRET: 'app-secret'
};