'use strict';
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _express = require('express');
var _express2 = _interopRequireDefault(_express);
var _environment = require('../config/environment');
var _environment2 = _interopRequireDefault(_environment);
var _user = require('../api/user/user.model');
var _user2 = _interopRequireDefault(_user);
var _auth = require('./auth.service');
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
require('./local/passport').setup(_user2.default);
var router = _express2.default.Router();
router.use(require('./local').default);
exports.default = router;
