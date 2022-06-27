'use strict';
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _express = require('express');
var _express2 = _interopRequireDefault(_express);
var _path = require('path');
var _path2 = _interopRequireDefault(_path);
var _environment = require('../../config/environment');
var _environment2 = _interopRequireDefault(_environment);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var router = _express2.default.Router();
router.get('/', function (req, res) {
  res.sendFile(_path2.default.resolve(_environment2.default.root, 'server/public/data/api_data/city.json'));
});
router.get('/:id_city/district', function (req, res) {
  res.sendFile(_path2.default.join(_environment2.default.root, 'server/public/data/api_data/district/' + req.params.id_city + '.json'));
});
exports.default = router;