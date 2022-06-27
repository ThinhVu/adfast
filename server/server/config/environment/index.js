/**
 * config environment dev and product
 */
'use strict';

import path from 'path';
import _ from 'lodash';

/*Configuration all environment*/
let all = {
  /*set environment*/
  env: process.env.NODE_ENV,

  /*root path for server*/
  root: path.join(__dirname, '../../..'),

  /*domain server*/
  domain: process.env.DOMAIN,

  /*browser sync port*/
  bowserSyncPort: process.env.Browser_Sync_Port,

  /*Server port*/
  port: process.env.PORT || 8080,

  /*Server Ip*/
  ip: process.env.IP || "0.0.0.0",

  /*secret => use session secret and token secret*/
  secret: {
    session: process.env.SESSION_SECRET
  },

  /*valid key => use valid param request to client*/
  keyValidate: '8498793949518795432',

  /*set directory client-path*/
  clientPath: process.env.CLIENT_PATH,

  /*set app facebook*/
  facebook: {
    clientID: process.env.FACEBOOK_ID || "id",
    clientSecret: process.env.FACEBOOK_SECRET || "secret",
    callbackURL: `${process.env.DOMAIN || ""}/auth/facebook/callback`
  },

  /*set app google*/
  google: {
    clientID: process.env.GOOGLE_ID || "id",
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `${process.env.DOMAIN || ""}/auth/google/callback`
  },

  /*email config*/
  email: {
    smtpConfig: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        // user: 'adfastsolution.mobile@gmail.com',
        // pass: 'takeit123456'
        user: 'wemobile.crm@gmail.com',
        pass: '123456a@'
      }
    },
    timeExpireActive: 3 * 24 * 60 * 60, //3day
    keyValidateSendMail: 'fbaa80cbd1b313a80c5d8d8976d409xx'
  }
};

/*Export object with config NODE_ENV use*/
export default _.merge(
  all,
  /*override environment use*/
  require(`./${process.env.NODE_ENV}.js` || '')
);