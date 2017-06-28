'use strict';

require('app-module-path').addPath(`${__dirname}/../../../app`); //make more realiable to call modules

const db_connect = require('core/libs/db_run');
const Mongorito = require('mongorito');

module.exports = function (done, conn = process.env.MONGO_URL) {
  db_connect(function *() {
      yield Mongorito.connect(conn);
      done();
  });
};

module.exports.discon = function(done) {
  db_connect(function *() {
      yield Mongorito.disconnect();
      done();
  });
};
