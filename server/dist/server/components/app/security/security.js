'use strict';
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _expressRateLimit = require('express-rate-limit');
var _expressRateLimit2 = _interopRequireDefault(_expressRateLimit);
var _expressBrute = require('express-brute');
var _expressBrute2 = _interopRequireDefault(_expressBrute);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var store = new _expressBrute2.default.MemoryStore();
var bruteForce = new _expressBrute2.default(store);
var limiter = new _expressRateLimit2.default({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  delayMs: 0 
});
var apiLimiter = new _expressRateLimit2.default({
  windowMs: 15 * 60 * 1000,
  max: 100,
  delayMs: 0
});
var accountLimiter = new _expressRateLimit2.default({
  windowMs: 60 * 60 * 1000,
  delayAfter: 1, 
  delayMs: 3 * 1000, 
  max: 10, 
  message: "Ban dang su dung qua nhieu request tren 1 dia chi ip, Vui long thu lai sau 1h!"
});
exports.default = {
  limiter: limiter,
  apiLimiter: apiLimiter,
  accountLimiter: accountLimiter,
  bruteForce: bruteForce
};