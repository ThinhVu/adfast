'use strict';

/*configuration specific production*/
/*=================================*/
module.exports = {
	mongodb: {
		server_config: {
			username: 'admin123',
			password: 'manhthinhdev',
			// host: '103.78.88.121',
			host: '127.0.0.1',
			port: 27017
		},
		dbName: 'phone_solution',
	},
	port: 8585,
	/*validate time api request*/
	timeExpire: 12000000,
	/*validate time token*/
	timeTokenExpire: 12 * 60 * 60, //<=> 12hours
};