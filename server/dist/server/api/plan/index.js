'use strict';
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _express = require('express');
var _express2 = _interopRequireDefault(_express);
var _plan = require('./plan.controller');
var controller = _interopRequireWildcard(_plan);
var _auth = require('../../auth/auth.service');
var _support = require('../../components/app/middlewares/support.middleware');
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var router = _express2.default.Router();
router.get('/', _support.checkGetTimeStamp, (0, _auth.isAuthenticated)(), controller.getPlan);
router.post('/', _support.checkPostTimeStamp, (0, _auth.hasRoleAdmin)(), controller.createPlan);
router.delete('/', _support.checkPostTimeStamp, (0, _auth.hasRoleAdmin)(), controller.deletePlan);
router.put('/', _support.checkPostTimeStamp, (0, _auth.hasRoleAdmin)(), controller.updatePlan);
exports.default = router;