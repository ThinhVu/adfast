/**
 * @author: ManhNV
 * @created 2017/04/26.
 * @description: config connection to mongodb
 */
'use strict';
let print = console.log;

export default async function (config, mongoose) {
  const url = await String.format("mongodb://{0}:{1}@{2}:{3}/{4}", //extension_methods method to StringBuilder
    config.mongodb.server_config.username,
    config.mongodb.server_config.password,
    config.mongodb.server_config.host,
    config.mongodb.server_config.port,
    config.mongodb.dbName);

  let isConnectedBefore = false;

  connect();

  function connect() {
    if (isConnectedBefore) {
      console.info('Db reconnecting...');
    } else {
      console.info('Connecting to Db...');
    }
    mongoose.connect(url, {useMongoClient: true});
  }

  mongoose.connection.on('error', function (err) {
    console.log('Could not connect to MongoDB: ', err);
  });

  mongoose.connection.on('disconnected', function () {
    console.log('Db has lost connection...');
    if (!isConnectedBefore) {
      setTimeout(connect, 5000);
    }
  });

  mongoose.connection.on('connected', function () {
    isConnectedBefore = true;
    print(`Db: ${config.mongodb.dbName}, host:${config.mongodb.server_config.host} connected success!`);
  });

  mongoose.connection.on('reconnected', function () {
    console.log('Db has reconnected!');
  });

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log('Mongoose default connection disconnected through app terminal!');
      process.exit(0);
    });
  });
}
