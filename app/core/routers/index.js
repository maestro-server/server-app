'use strict';

const {name:app, version, description} = require('../../../package.json');

module.exports = function (router) {

    router.get('/', function (req, res) {

      const api_timeout = process.env.MAESTRO_TIMEOUT || 10000;

      res.json(
        {
          app,
          description,
          version,
          api_timeout
        });
    });
};
