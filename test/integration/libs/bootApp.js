'use strict';

require('app-module-path').addPath(`${__dirname}/../../../app`); //make more realiable to call modules

const express = require('express');
const kraken = require('kraken-js');

const db_connect = require('core/libs/db_run');
const Connector = require('core/repositories/daos/connector/connector');
const dbpath = require('core/libs/dbpath')();
const path = require('path');

module.exports = function (conn = dbpath) {
  let options = {
    basedir: path.resolve(__dirname, '../../../app/'),
      onconfig: function (config, next) {
          db_connect(function *() {
              yield Connector.connect(conn);
              next(null, config);
          });
      }
  };

  let app = express();

  app.use(kraken(options));

  app.on('start', function () {
      console.log('Environment: %s', app.kraken.get('env:env'));
  });

  return app;
};
