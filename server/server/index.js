/**
 * Created by ManhNV on 12/15/2016.
 * */
'use strict';

const _ = require('lodash');
const node_env = process.env.NODE_ENV = process.env.NODE_ENV || process.argv[2] || "production";

process.env = _.merge(process.env, require(`./config/${node_env}.env.js`));

if (node_env === "development") {
	require('babel-register');
	require('babel-polyfill');
}

module.exports = require('./app');