'use strict';
var _express = require('express');
var _express2 = _interopRequireDefault(_express);
var _mongoose = require('mongoose');
var _mongoose2 = _interopRequireDefault(_mongoose);
var _environment = require('./config/environment');
var _environment2 = _interopRequireDefault(_environment);
var _http = require('http');
var _http2 = _interopRequireDefault(_http);
var _stringbuilder = require('stringbuilder');
var _stringbuilder2 = _interopRequireDefault(_stringbuilder);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_mongoose2.default.Promise = global.Promise; 
_stringbuilder2.default.extend('string'); 
require('./config/mongo-connect').default(_environment2.default, _mongoose2.default);
var app = (0, _express2.default)();
app.set('env', _environment2.default.env);
var server = _http2.default.createServer(app);
var print = console.log;
require('./config/express').default(app);
require('./routes').default(app);
app.startServer = function startServer() {
  server.listen(_environment2.default.port, _environment2.default.ip, function () {
    print(server.address());
    print("Server listening on port: {0}, in {1} mode".format(_environment2.default.port, app.get('env')));
  });
};
app.startServer();
module.exports = app;