'use strict';
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _express = require('express');
var _express2 = _interopRequireDefault(_express);
var _failure = require('./failure.controller');
var controller = _interopRequireWildcard(_failure);
var _traffic = require('../traffic/traffic.controller');
var _auth = require('../../auth/auth.service');
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var router = _express2.default.Router();
router.post('/error', controller.createFailure);
router.post('/success', _traffic.createTraffic);
router.delete('/failure', (0, _auth.hasRoleAdmin)(), controller.deleteFailure);
exports.default = router;