/**
 * Created by NguyenManh on 7/21/2016.
 */
'use strict';

import crypt_md5 from 'md5';
import path from 'path';
import constant from '../components/app/constants/constant';

/*resolve domain and timestamp*/
exports.currentTimeStamp = {
	getTimeStamp: Math.floor(new Date().valueOf() / 1000),
	getKeyPass: (setTimeStamp) => {
		return crypt_md5(constant.const_key + setTimeStamp);
	},
};

/*resolve path server and client*/
exports.error_path = {
	Page403: path.resolve(__dirname, '../', 'components/views', '403.html'),
	Page404: path.resolve(__dirname, '../', 'components/views', '404.html'),
	Page429: path.resolve(__dirname, '../', 'components/views', '429.html'),
	Page500: path.resolve(__dirname, '../', 'components/views', '500.html')
};