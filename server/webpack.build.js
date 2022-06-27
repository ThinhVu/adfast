/*
 * webpack config for build, release app
 * */
'use strict';

module.exports = require('./webpack.make')({
  BUILD: true,
  TEST: false,
  DEV: false
});