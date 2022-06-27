/**
 * @author: ManhNV
 * @copyright: AdFast 2017- Mobile Solution
 * @description: user controller execute
 * @define 12/19/2016.
 * @version: 1.0.0
 */

'use strict';
import generator from 'generate-password';
import sha512 from 'crypto-js/sha512';
import moment from 'moment';

import User from './user.model';
import Package from '../package/package.model';
import constants from '../../components/app/constants/constant';
import {sendEmailActiveUser, sendEmailForgotPassword} from '../../config/email.config';
import {
  validationError,
  invalidParams
} from '../../components/app/middlewares/support.middleware';
import keys from '../../components/app/constants/key';

let ObjectId = require('mongoose').mongo.ObjectId;
let IdValid = require('mongoose').Types.ObjectId.isValid;

/**
 * @method: {signUser}
 * @description: signup user
 * @param req
 * @param res
 */
export function signUser(req, res) {
  if (!req.body.username || !req.body.email
    || !req.body.phone || !req.body.password) {
    return res.status(400).json({success: false, error: constants.warning.invalid_param});
  }
  User.findOne({email: req.body.email.trim()}).exec()
    .then(user => {
      if (user) return res.status(400).json({
        success: false,
        error: constants.warning.email_duplicate
      });
      else {
        let newUser = new User({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          phone: req.body.phone,
          address: {
            city: req.body.city || '',
            district: req.body.district || ''
          }
        });

        return newUser.save()
          .then(user => {
            return Promise.all([createPackage(user), sendEmailActiveUser(user)])
              .then(result => res.status(200).json({success: true, message: result[1]}))
              .catch(validationError(res));
          }).catch(validationError(res));
      }
    }).catch(err => {
      console.log(err);
  });
}

/**
 * @method {createPackage}
 * @description support method Sign user
 * @param user
 * @returns {Promise}
 */
function createPackage(user) {
  return new Promise((resolve, reject) => {
    let newPackage = new Package({
      _user: user._id,
      phoneRemain: 0,
      dateExpire: moment().second(0).minute(0).hour(0)._d
    });
    return newPackage.save()
      .then(pkg => resolve({data: pkg}))
      .catch(error => reject(error));
  })
}

/**
 * @method: {getProfileUser}
 * @description: get user information
 * == Pass middleware: isAuthenticate
 * @param req
 * @param res
 */
export function getProfileUser(req, res) {
  //get user from req.user attach middleware (isAuthenticate)
  return Package.findOne({_user: ObjectId(req.user._id)})
    .populate({
      path: '_user',
      select: 'username email phone budget -_id'
    })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(401).json({
          success: false,
          error: constants.error.server_not_running
        });
      } else {
        res.status(200).json({success: true, data: user}); //virtual profile
      }
    }).catch(validationError(res, 401));
}

/**
 * @method: {updateUser}
 * @description: update user information
 * @param req
 * @param res
 */
export function updateUser(req, res) {
  if (!req.body.username || !req.body.email || !req.body.phone) {
    invalidParams(res);
  } //check unique email
  else if (req.user.email === req.body.email.trim().toLowerCase()) {
    updateUserInformation(req, res);
  } else {
    return User.findOne({
      email: {
        $eq: req.body.email.trim().toLowerCase(),
        $ne: req.user.email
      }
    }).exec()
      .then(user => {
        if (!user) {
          updateUserInformation(req, res);
        } else {
          return res.status(400).json({
            success: false,
            error: constants.warning.email_duplicate
          });
        }
      })
      .catch(validationError(res, 401));
  }
}

/**
 * @method: {changePassword}
 * @description: change password user
 * == Pass middleware: isAuthenticate
 * @param req
 * @param res
 */
export function changePassword(req, res) {
  if (!req.body[keys.post.old_password] || !req.body[keys.post.new_password]) {
    invalidParams(res);
  } else {
    return User.findById(req.user._id).exec()
      .then(user => {
        if (user.authenticate(req.body[keys.post.old_password])) {
          user.password = req.body[keys.post.new_password];
          return user.save()
            .then(() => {
              res.status(200).json({
                success: true,
                message: constants.success.update_password_success
              });
            })
            .catch(validationError(res, 401));
        } else {
          return res.status(401).json({
            success: false,
            error: constants.warning.password_incorrect
          });
        }
      })
  }
}

/**
 * @method: {changeBudget}
 * @description: Pass middleware: isAuthenticate
 * @summary: budget / 100.000 VNĐ
 * @param req
 * @param res
 */
export function changeBudget(req, res) {
  const reg = /\d+$/g;
  if (!req.body[keys.post.user_id] || !req.body.budget
    || !reg.test(req.body.budget) || parseInt(req.body.budget) / 100000 !== 0) {
    invalidParams(res);
  } else {
    return User.findByIdAndUpdate(req.body[keys.post.user_id],
      {$set: {budget: parseInt(req.body.budget)}}).exec()
      .then(() => {
        res.status(200).json({
          success: true,
          message: constants.success.update_budget_success
        });
      })
      .catch(validationError(res, 401));
  }
}

/**
 * @method: {activeWithEmail}
 * @description: service active user through link send email
 * @param req
 * @param res
 */
export function activeWithEmail(req, res) {
  if (!req.query[keys.query.email_key])
    return res.status(404).json({success: false, error: constants.warning.invalid_param});
  const reg = /f18932czz124567|1234x34678334/g;
  const _getId = req.query[keys.query.email_key].trim().replace(reg, '');
  if (IdValid(_getId)) {
    return User.findByIdAndUpdate(_getId, {$set: {active: true}}).exec()
      .then(() => res.status(200).json({
        success: true, message: constants.success.user_active_success
      }))
      .catch(error => res.status(503).json({success: false, error}))
  } else {
    invalidParams(res);
  }
}

/**
 * @method: {forgotPassword}
 * @description: service forgot password
 * @param req
 * @param res
 */
export function forgotPassword(req, res) {
  if (!req.body.email)
    return res.status(404).json({
      success: false,
      error: constants.warning.invalid_param
    });
  const newPassword = generator.generate({
    length: 8,
    numbers: true,
    uppercase: false
  });
  User.findOneAndUpdate({email: req.body.email.trim()},
    {$set: {password: sha512(newPassword).toString()}}).exec()
    .then(user => {
      if (!user) return res.status(404).json({
        success: false,
        error: constants.warning.email_not_exist
      });
      sendEmailForgotPassword(newPassword, user.email)
        .then(message => res.status(200).json({success: true, message}))
        .catch(err => res.status(503).json({success: false, err}));
    })
    .catch(err => res.status(503).json({
      success: false,
      message: `Lỗi máy chủ nội bộ! Thông tin lỗi: ${err}`
    }));
}

/**=========RESTRICTION: ADMIN MANAGE================================================================================*/
/**
 * @method: {getListUser}
 * @description: get list user from system
 *  3 action:
 *    + get-all: get list user active+ deActive in db
 *    + list-active: get list user is active
 *    + list-de-active: get list user is de-active,
 *    + default: invalid param
 * @requires: {admin}
 * @param req
 * @param res
 */
export function getListUser(req, res) {
  if (!req.query.action) {
    invalidParams(res);
  } else {
    switch (req.query.action) {
      case 'get-all':
        return User.find({}, '-password').exec()
          .then(lstUser => {
            res.status(200).json({success: true, lstUser});
          })
          .catch(validationError(res));
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
        invalidParams(res);
        break;
    }
  }
}

/**
 * @method: {isLockUser}
 * @description: lock and unlock user
 *  3 action
 *    + 'true' : lock user account
 *    + 'false' : unlock user account
 *    + default => invalid param
 * @requires: {admin}
 * @param req
 * @param res
 */
export function isLockUser(req, res) {
  if (!req.body[keys.post.user_id] || !req.body.action
    || !IdValid(req.body[keys.post.user_id])) {
    invalidParams(res);
  } else {
    switch (req.body.action) {
      //lock user
      case 'true':
        lockUser(req, res, 'true');
        break;
      //unlock user
      case 'false':
        lockUser(req, res, 'false');
        break;
      //default => error
      default:
        invalidParams(res);
        break;
    }
  }
}

/**
 * @method: {isActive}
 * @description: services active user, admin has active and deactive user
 *  4 action
 *    + active: active user account
 *    + deactive: deactive user account
 * @param req
 * @param res
 */
export function isActive(req, res) {
  if (!req.body.action) {
    invalidParams(res);
  } else {
    switch (req.body.action) {
      //active through email server
      case 'active':
        activeUser(req, res, 'active');
        break;
      case 'deactive':
        activeUser(req, res, 'deactive');
        break;
      default:
        invalidParams(res);
        break;
    }
  }
}

/**==================================== FUNCTION SUPPORT =================================*/

/**
 * @method: {lockUser}
 * @description: support api lock and unlock user
 * @param req
 * @param res
 * @param action
 * @returns {Query}
 */
function lockUser(req, res, action) {
  try {
    return User.findByIdAndUpdate(ObjectId(req.body[keys.post.user_id]),
      {$set: {isLock: (action === 'true')}}).exec()
      .then(() => res.status(204).end())
      .catch(validationError(res));
  } catch (err) {
    return res.status(503).json({success: false, err});
  }
}

/**
 * @method: {activeUser}
 * @description: support api active and deactive user
 * @param req
 * @param res
 * @param action
 * @returns {Query}
 */
function activeUser(req, res, action) {
  try {
    if (req.body._id && IdValid(req.body._id)) {
      return User.findByIdAndUpdate(req.body._id,
        {$set: {active: (action === 'active')}},
        function (err) {
          if (err) return res.status(503).json({success: false, message: err});
          else res.status(200).json({
            success: true, message: action === 'active' ? constants.success.active_user_success
              : constants.success.deactive_user_success
          });
        });
    } else {
      invalidParams(res);
    }
  } catch (err) {
    return res.status(503).json({success: false, err});
  }
}

/**
 * @method {showListStateLock}
 * @description: get list user is lock and unlock
 * @param res
 * @param action
 */
function showListStateLock(res, action) {
  try {
    return User.find({isLock: (action === "list-lock")}, '-password -role').exec()
      .then(listUser => res.status(200).json({success: true, listUser}))
      .catch(validationError(res));
  } catch (err) {
    return res.status(503).json({success: false, err});
  }
}

/**
 * @method {showListStateActive}
 * @description: get list user is active and deactive
 * @param res
 * @param action
 */
function showListStateActive(res, action) {
  try {
    return User.find({active: (action === 'list-active')}, '-password -role',
      function (err, listUser) {
        if (err) return res.status(503).json({success: false, message: err});
        else res.status(200).json({success: true, listUser})
      })
  } catch (error) {
    return res.status(400).json({success: false, error});
  }
}


/**
 * @method: {updateUserInformation}
 * @description: update user information
 * @param req
 * @param res
 */
function updateUserInformation(req, res) {
  return User.update({_id: ObjectId(req.user._id)},
    {
      $set: {
        username: req.body.username,
        email: req.user.email,
        address: {
          city: req.body.city || '',
          district: req.body.district || ''
        },
        phone: req.body.phone
      }
    }).exec()
    .then(() => {
      res.status(200).json({success: true, message: constants.success.update_account_success});
    })
    .catch(validationError(res, 401));
}