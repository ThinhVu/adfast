'use strict';
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _express = require('express');
var _express2 = _interopRequireDefault(_express);
var _package = require('./package.controller');
var controller = _interopRequireWildcard(_package);
var _auth = require('../../auth/auth.service');
var _support = require('../../components/app/middlewares/support.middleware');
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var router = _express2.default.Router();
router.get('/', _support.checkGetTimeStamp, (0, _auth.isAuthenticated)(), controller.getPackage);
router.get('/get-all', _support.checkGetTimeStamp, (0, _auth.hasRoleAdmin)(), controller.getAllPackage);
router.post('/', _support.checkPostTimeStamp, (0, _auth.hasRoleAdmin)(), controller.createPackage);
router.put('/', _support.checkPostTimeStamp, (0, _auth.hasRoleAdmin)(), controller.updatePackage);
exports.default = router;