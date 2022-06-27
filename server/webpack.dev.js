/*
 * webpack config environment developer, run in hot load module
 * */
'use strict';

module.exports = require('./webpack.make')({
  BUILD: false,
  TEST: false,
  DEV: true
});