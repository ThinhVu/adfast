'use strict';
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _promise = require('babel-runtime/core-js/promise');
var _promise2 = _interopRequireDefault(_promise);
exports.signUser = signUser;
exports.getProfileUser = getProfileUser;
exports.updateUser = updateUser;
exports.changePassword = changePassword;
exports.changeBudget = changeBudget;
exports.activeWithEmail = activeWithEmail;
exports.forgotPassword = forgotPassword;
exports.getListUser = getListUser;
exports.isLockUser = isLockUser;
exports.isActive = isActive;
var _generatePassword = require('generate-password');
var _generatePassword2 = _interopRequireDefault(_generatePassword);
var _sha = require('crypto-js/sha512');
var _sha2 = _interopRequireDefault(_sha);
var _moment = require('moment');
var _moment2 = _interopRequireDefault(_moment);
var _user = require('./user.model');
var _user2 = _interopRequireDefault(_user);
var _package = require('../package/package.model');
var _package2 = _interopRequireDefault(_package);
var _constant = require('../../components/app/constants/constant');
var _constant2 = _interopRequireDefault(_constant);
var _email = require('../../config/email.config');
var _support = require('../../components/app/middlewares/support.middleware');
var _key = require('../../components/app/constants/key');
var _key2 = _interopRequireDefault(_key);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var ObjectId = require('mongoose').mongo.ObjectId;
var IdValid = require('mongoose').Types.ObjectId.isValid;
function signUser(req, res) {
  if (!req.body.username || !req.body.email || !req.body.phone || !req.body.password) {
    return res.status(400).json({ success: false, error: _constant2.default.warning.invalid_param });
  }
  _user2.default.findOne({ email: req.body.email.trim() }).exec().then(function (user) {
    if (user) return res.status(400).json({
      success: false,
      error: _constant2.default.warning.email_duplicate
    });else {
      var newUser = new _user2.default({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        address: {
          city: req.body.city || '',
          district: req.body.district || ''
        }
      });
      return newUser.save().then(function (user) {
        return _promise2.default.all([createPackage(user), (0, _email.sendEmailActiveUser)(user)]).then(function (result) {
          return res.status(200).json({ success: true, message: result[1] });
        }).catch((0, _support.validationError)(res));
      }).catch((0, _support.validationError)(res));
    }
  }).catch(function (err) {
    void 0;
  });
}
function createPackage(user) {
  return new _promise2.default(function (resolve, reject) {
    var newPackage = new _package2.default({
      _user: user._id,
      phoneRemain: 0,
      dateExpire: (0, _moment2.default)().second(0).minute(0).hour(0)._d
    });
    return newPackage.save().then(function (pkg) {
      return resolve({ data: pkg });
    }).catch(function (error) {
      return reject(error);
    });
  });
}
function getProfileUser(req, res) {
  return _package2.default.findOne({ _user: ObjectId(req.user._id) }).populate({
    path: '_user',
    select: 'username email phone budget -_id'
  }).exec().then(function (user) {
    if (!user) {
      return res.status(401).json({
        success: false,
        error: _constant2.default.error.server_not_running
      });
    } else {
      res.status(200).json({ success: true, data: user }); 
    }
  }).catch((0, _support.validationError)(res, 401));
}
function updateUser(req, res) {
  if (!req.body.username || !req.body.email || !req.body.phone) {
    (0, _support.invalidParams)(res);
  } 
  else if (req.user.email === req.body.email.trim().toLowerCase()) {
      updateUserInformation(req, res);
    } else {
      return _user2.default.findOne({
        email: {
          $eq: req.body.email.trim().toLowerCase(),
          $ne: req.user.email
        }
      }).exec().then(function (user) {
        if (!user) {
          updateUserInformation(req, res);
        } else {
          return res.status(400).json({
            success: false,
            error: _constant2.default.warning.email_duplicate
          });
        }
      }).catch((0, _support.validationError)(res, 401));
    }
}
function changePassword(req, res) {
  if (!req.body[_key2.default.post.old_password] || !req.body[_key2.default.post.new_password]) {
    (0, _support.invalidParams)(res);
  } else {
    return _user2.default.findById(req.user._id).exec().then(function (user) {
      if (user.authenticate(req.body[_key2.default.post.old_password])) {
        user.password = req.body[_key2.default.post.new_password];
        return user.save().then(function () {
          res.status(200).json({
            success: true,
            message: _constant2.default.success.update_password_success
          });
        }).catch((0, _support.validationError)(res, 401));
      } else {
        return res.status(401).json({
          success: false,
          error: _constant2.default.warning.password_incorrect
        });
      }
    });
  }
}
function changeBudget(req, res) {
  var reg = /\d+$/g;
  if (!req.body[_key2.default.post.user_id] || !req.body.budget || !reg.test(req.body.budget) || parseInt(req.body.budget) / 100000 !== 0) {
    (0, _support.invalidParams)(res);
  } else {
    return _user2.default.findByIdAndUpdate(req.body[_key2.default.post.user_id], { $set: { budget: parseInt(req.body.budget) } }).exec().then(function () {
      res.status(200).json({
        success: true,
        message: _constant2.default.success.update_budget_success
      });
    }).catch((0, _support.validationError)(res, 401));
  }
}
function activeWithEmail(req, res) {
  if (!req.query[_key2.default.query.email_key]) return res.status(404).json({ success: false, error: _constant2.default.warning.invalid_param });
  var reg = /f18932czz124567|1234x34678334/g;
  var _getId = req.query[_key2.default.query.email_key].trim().replace(reg, '');
  if (IdValid(_getId)) {
    return _user2.default.findByIdAndUpdate(_getId, { $set: { active: true } }).exec().then(function () {
      return res.status(200).json({
        success: true, message: _constant2.default.success.user_active_success
      });
    }).catch(function (error) {
      return res.status(503).json({ success: false, error: error });
    });
  } else {
    (0, _support.invalidParams)(res);
  }
}
function forgotPassword(req, res) {
  if (!req.body.email) return res.status(404).json({
    success: false,
    error: _constant2.default.warning.invalid_param
  });
  var newPassword = _generatePassword2.default.generate({
    length: 8,
    numbers: true,
    uppercase: false
  });
  _user2.default.findOneAndUpdate({ email: req.body.email.trim() }, { $set: { password: (0, _sha2.default)(newPassword).toString() } }).exec().then(function (user) {
    if (!user) return res.status(404).json({
      success: false,
      error: _constant2.default.warning.email_not_exist
    });
    (0, _email.sendEmailForgotPassword)(newPassword, user.email).then(function (message) {
      return res.status(200).json({ success: true, message: message });
    }).catch(function (err) {
      return res.status(503).json({ success: false, err: err });
    });
  }).catch(function (err) {
    return res.status(503).json({
      success: false,
      message: 'L\u1ED7i m\xE1y ch\u1EE7 n\u1ED9i b\u1ED9! Th\xF4ng tin l\u1ED7i: ' + err
    });
  });
}
function getListUser(req, res) {
  if (!req.query.action) {
    (0, _support.invalidParams)(res);
  } else {
    switch (req.query.action) {
      case 'get-all':
        return _user2.default.find({}, '-password').exec().then(function (lstUser) {
          res.status(200).json({ success: true, lstUser: lstUser });
        }).catch((0, _support.validationError)(res));
        break;
      case 'list-lock':
        showListStateLock(res, 'list-lock');
        break;
      case 'list-unlock':
        showListStateLock(res, 'list-unlock');
        break;
      case 'list-active':
        showListStateActive(res, 'list-active');
        break;
      case 'list-deactive':
        showListStateActive(res, 'list-deactive');
        break;
      default:
        (0, _support.invalidParams)(res);
        break;
    }
  }
}
function isLockUser(req, res) {
  if (!req.body[_key2.default.post.user_id] || !req.body.action || !IdValid(req.body[_key2.default.post.user_id])) {
    (0, _support.invalidParams)(res);
  } else {
    switch (req.body.action) {
      case 'true':
        lockUser(req, res, 'true');
        break;
      case 'false':
        lockUser(req, res, 'false');
        break;
      default:
        (0, _support.invalidParams)(res);
        break;
    }
  }
}
function isActive(req, res) {
  if (!req.body.action) {
    (0, _support.invalidParams)(res);
  } else {
    switch (req.body.action) {
      case 'active':
        activeUser(req, res, 'active');
        break;
      case 'deactive':
        activeUser(req, res, 'deactive');
        break;
      default:
        (0, _support.invalidParams)(res);
        break;
    }
  }
}
function lockUser(req, res, action) {
  try {
    return _user2.default.findByIdAndUpdate(ObjectId(req.body[_key2.default.post.user_id]), { $set: { isLock: action === 'true' } }).exec().then(function () {
      return res.status(204).end();
    }).catch((0, _support.validationError)(res));
  } catch (err) {
    return res.status(503).json({ success: false, err: err });
  }
}
function activeUser(req, res, action) {
  try {
    if (req.body._id && IdValid(req.body._id)) {
      return _user2.default.findByIdAndUpdate(req.body._id, { $set: { active: action === 'active' } }, function (err) {
        if (err) return res.status(503).json({ success: false, message: err });else res.status(200).json({
          success: true, message: action === 'active' ? _constant2.default.success.active_user_success : _constant2.default.success.deactive_user_success
        });
      });
    } else {
      (0, _support.invalidParams)(res);
    }
  } catch (err) {
    return res.status(503).json({ success: false, err: err });
  }
}
function showListStateLock(res, action) {
  try {
    return _user2.default.find({ isLock: action === "list-lock" }, '-password -role').exec().then(function (listUser) {
      return res.status(200).json({ success: true, listUser: listUser });
    }).catch((0, _support.validationError)(res));
  } catch (err) {
    return res.status(503).json({ success: false, err: err });
  }
}
function showListStateActive(res, action) {
  try {
    return _user2.default.find({ active: action === 'list-active' }, '-password -role', function (err, listUser) {
      if (err) return res.status(503).json({ success: false, message: err });else res.status(200).json({ success: true, listUser: listUser });
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
}
function updateUserInformation(req, res) {
  return _user2.default.update({ _id: ObjectId(req.user._id) }, {
    $set: {
      username: req.body.username,
      email: req.user.email,
      address: {
        city: req.body.city || '',
        district: req.body.district || ''
      },
      phone: req.body.phone
    }
  }).exec().then(function () {
    res.status(200).json({ success: true, message: _constant2.default.success.update_account_success });
  }).catch((0, _support.validationError)(res, 401));
}