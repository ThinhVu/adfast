'use strict';
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _express = require('express');
var _express2 = _interopRequireDefault(_express);
var _traffic = require('./traffic.controller');
var controller = _interopRequireWildcard(_traffic);
var _auth = require('../../auth/auth.service');
var _support = require('../../components/app/middlewares/support.middleware');
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var router = _express2.default.Router();
router.post('/', controller.createTraffic);
router.get('/', _support.checkGetTimeStamp, (0, _auth.isAuthenticated)(), controller.filterTraffic);
router.get('/push_notification', (0, _auth.isAuthenticated)(), controller.pushNotification);
exports.default = router;