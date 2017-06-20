'use strict';

require('app-module-path').addPath(`${__dirname}/../../../app`); //make more realiable to call modules

const express = require('express');
const kraken = require('kraken-js');

const db_connect = require('core/libs/db_run');
const Mongorito = require('mongorito');

const path = require('path');

module.exports = function (conn = process.env.MONGO_URL) {
  let options = {
    basedir: path.resolve(__dirname, '../../../app/'),
      onconfig: function (config, next) {
          db_connect(function *() {
              yield Mongorito.connect(conn);
              next(null, config);
              console.log("Mongo online");
          });
      }
  };

  let app = express();

  app.use(kraken(options));

  app.on('start', function () {
      console.log('Application ready to serve requests.');
      console.log('Environment: %s', app.kraken.get('env:env'));
  });

  return app;
};
