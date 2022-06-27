'use strict';
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _path = require('path');
var _path2 = _interopRequireDefault(_path);
var _lodash = require('lodash');
var _lodash2 = _interopRequireDefault(_lodash);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var all = {
  env: process.env.NODE_ENV,
  root: _path2.default.join(__dirname, '../../..'),
  domain: process.env.DOMAIN,
  bowserSyncPort: process.env.Browser_Sync_Port,
  port: process.env.PORT || 8080,
  ip: process.env.IP || "0.0.0.0",
  secret: {
    session: process.env.SESSION_SECRET
  },
  keyValidate: '8498793949518795432',
  clientPath: process.env.CLIENT_PATH,
  facebook: {
    clientID: process.env.FACEBOOK_ID || "id",
    clientSecret: process.env.FACEBOOK_SECRET || "secret",
    callbackURL: (process.env.DOMAIN || "") + '/auth/facebook/callback'
  },
  google: {
    clientID: process.env.GOOGLE_ID || "id",
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: (process.env.DOMAIN || "") + '/auth/google/callback'
  },
  email: {
    smtpConfig: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, 
      auth: {
        user: 'wemobile.crm@gmail.com',
        pass: '123456a@'
      }
    },
    timeExpireActive: 3 * 24 * 60 * 60, 
    keyValidateSendMail: 'fbaa80cbd1b313a80c5d8d8976d409xx'
  }
};
exports.default = _lodash2.default.merge(all,
require('./' + process.env.NODE_ENV + '.js' || ''));