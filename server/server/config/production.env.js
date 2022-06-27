'use strict';
const path = require('path');

/*production config*/
module.exports = {
	/*Domain: use create app and requestToCallback Url Authenticate G+, Facebook*/
	//Todo setting domain  => support MinhDV
	DOMAIN: 'http://api.adfast.tech:8585', //config domain server when change server
	SESSION_SECRET: '199X-master-js_development-production',
	CLIENT_PATH: path.join(__dirname, '../../client/public'),

	FACEBOOK_ID: 'app-id',
	FACEBOOK_SECRET: 'app-secret',

	GOOGLE_ID: 'app-id',
	GOOGLE_SECRET: 'app-secret'
};