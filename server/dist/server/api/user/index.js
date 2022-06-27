'use strict';
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _express = require('express');
var _express2 = _interopRequireDefault(_express);
var _auth = require('../../auth/auth.service');
var auth = _interopRequireWildcard(_auth);
var _user = require('./user.controler');
var controller = _interopRequireWildcard(_user);
var _support = require('../../components/app/middlewares/support.middleware');
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var router = _express2.default.Router();
router.post('/', _support.checkPostTimeStamp, auth.isNotLoginApi(), controller.signUser);
router.put('/', _support.checkPostTimeStamp, auth.isAuthenticated(), controller.updateUser);
router.put('/change-pass', _support.checkPostTimeStamp, auth.isAuthenticated(), controller.changePassword);
router.get('/profile', _support.checkGetTimeStamp, auth.isAuthenticated(), controller.getProfileUser);
router.get('/email-active', _support.checkGetTimeStampEmail, controller.activeWithEmail);
router.post('/forgot-password', _support.checkPostTimeStamp, controller.forgotPassword);
router.get('/', _support.checkGetTimeStamp, auth.hasRoleAdmin(), controller.getListUser);
router.put('/is-lock', _support.checkPostTimeStamp, auth.hasRoleAdmin(), controller.isLockUser);
router.put('/is-active', _support.checkPostTimeStamp, auth.hasRoleAdmin(), controller.isActive);
router.put('/change-budget', _support.checkPostTimeStamp, auth.hasRoleAdmin(), controller.changeBudget);
exports.default = router;