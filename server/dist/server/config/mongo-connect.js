'use strict';
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _regenerator = require('babel-runtime/regenerator');
var _regenerator2 = _interopRequireDefault(_regenerator);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var print = console.log;
exports.default = function _callee(config, mongoose) {
  var url, isConnectedBefore, connect;
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          connect = function connect() {
            if (isConnectedBefore) {
              void 0;
            } else {
              void 0;
            }
            mongoose.connect(url, { useMongoClient: true });
          };
          _context.next = 3;
          return _regenerator2.default.awrap(String.format("mongodb://{0}:{1}@{2}:{3}/{4}", 
          config.mongodb.server_config.username, config.mongodb.server_config.password, config.mongodb.server_config.host, config.mongodb.server_config.port, config.mongodb.dbName));
        case 3:
          url = _context.sent;
          isConnectedBefore = false;
          connect();
          mongoose.connection.on('error', function (err) {
            void 0;
          });
          mongoose.connection.on('disconnected', function () {
            void 0;
            if (!isConnectedBefore) {
              setTimeout(connect, 5000);
            }
          });
          mongoose.connection.on('connected', function () {
            isConnectedBefore = true;
            print('Db: ' + config.mongodb.dbName + ', host:' + config.mongodb.server_config.host + ' connected success!');
          });
          mongoose.connection.on('reconnected', function () {
            void 0;
          });
          process.on('SIGINT', function () {
            mongoose.connection.close(function () {
              void 0;
              process.exit(0);
            });
          });
        case 11:
        case 'end':
          return _context.stop();
      }
    }
  }, null, this);
};