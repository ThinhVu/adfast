'use strict';
module.exports = {
	mongodb: {
		server_config: {
			username: 'admin123',
			password: 'manhthinhdev',
			host: '127.0.0.1',
			port: 27017
		},
		dbName: 'phone_solution'
	},
	port: 8585,
	timeExpire: 12000000,
	timeTokenExpire: 12 * 60 * 60 
};