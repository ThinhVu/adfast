'use strict';

/*configuration specific production*/
/*=================================*/
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
	/*validate time api request 5 minutes*/
	timeExpire: 300,
	/*validate time token*/
	timeTokenExpire: 2 * 60 * 60, //<=> 2hours
};