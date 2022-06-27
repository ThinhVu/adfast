'use strict';
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _express = require('express');
var _express2 = _interopRequireDefault(_express);
var _transaction = require('./transaction.controller');
var controller = _interopRequireWildcard(_transaction);
var _auth = require('../../auth/auth.service');
var auth = _interopRequireWildcard(_auth);
var _support = require('../../components/app/middlewares/support.middleware');
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var router = _express2.default.Router();
router.get('/', _support.checkGetTimeStamp, auth.isAuthenticated(), controller.getCurrentUserTransaction);
router.post('/', _support.checkPostTimeStamp, auth.isAuthenticated(), controller.createTransaction);
router.post('/filter', _support.checkPostTimeStamp, auth.isAuthenticated(), controller.filterDateTransaction);
router.get('/get-all', _support.checkGetTimeStamp, auth.hasRoleAdmin(), controller.getAllTransaction);
router.delete('/', _support.checkPostTimeStamp, auth.hasRoleAdmin(), controller.deleteTransaction);
router.post('/filter-all', _support.checkPostTimeStamp, auth.hasRoleAdmin(), controller.filterAllDateTransaction);
exports.default = router;