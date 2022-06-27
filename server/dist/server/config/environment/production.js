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
	timeExpire: 300,
	timeTokenExpire: 2 * 60 * 60 
};