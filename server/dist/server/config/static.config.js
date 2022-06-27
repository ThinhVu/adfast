'use strict';
var _md = require('md5');
var _md2 = _interopRequireDefault(_md);
var _path = require('path');
var _path2 = _interopRequireDefault(_path);
var _constant = require('../components/app/constants/constant');
var _constant2 = _interopRequireDefault(_constant);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
exports.currentTimeStamp = {
	getTimeStamp: Math.floor(new Date().valueOf() / 1000),
	getKeyPass: function getKeyPass(setTimeStamp) {
		return (0, _md2.default)(_constant2.default.const_key + setTimeStamp);
	}
};
exports.error_path = {
	Page403: _path2.default.resolve(__dirname, '../', 'components/views', '403.html'),
	Page404: _path2.default.resolve(__dirname, '../', 'components/views', '404.html'),
	Page429: _path2.default.resolve(__dirname, '../', 'components/views', '429.html'),
	Page500: _path2.default.resolve(__dirname, '../', 'components/views', '500.html')
};