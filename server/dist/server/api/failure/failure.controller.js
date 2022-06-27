'use strict';
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFailure = createFailure;
exports.deleteFailure = deleteFailure;
var _failure = require('./failure.model');
var _failure2 = _interopRequireDefault(_failure);
var _constant = require('../../components/app/constants/constant');
var _constant2 = _interopRequireDefault(_constant);
var _support = require('../../components/app/middlewares/support.middleware');
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var ObjectId = require('mongoose').mongo.ObjectId;
var IdValid = require('mongoose').Types.ObjectId.isValid;
function createFailure(req, res) {
  var failure = new _failure2.default({
    src: req.body.src,
    msg: req.body.msg,
    url: req.body.url
  });
  failure.save().then(function () {
    return res.status(204).end();
  }).catch(function () {
    return res.status(400).end();
  });
}
function deleteFailure(req, res) {
  if (!req.body._id || IdValid(req.body._id)) (0, _support.invalidParams)(res);
  return _failure2.default.findOneAndRemove({ _id: ObjectId(req.body._id) }).then(function () {
    return res.status(200).json({
      success: true,
      message: _constant2.default.success.delete_failure_success
    });
  }).catch((0, _support.validationError)(res, 400));
}