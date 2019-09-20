'use strict';

require('app-module-path').addPath(`${__dirname}/../../../app`); //make more realiable to call modules

const db_connect = require('core/libs/db_run');
const Connector = require('core/repositories/daos/connector/connector');
const dbpath = require('core/libs/dbpath')();
const dbname = require('core/libs/dbname')();

module.exports = function (done, conn = dbpath) {
  db_connect(function *() {
      yield Connector.connect(conn, dbname);
      done();
  });
};

module.exports.discon = function(done) {
  db_connect(function *() {
      yield Connector.disconnect();
      done();
  });
};
