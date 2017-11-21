'use strict';

const {name:app, version, description} = require('../../../package.json');

module.exports = function (router) {

    router.get('/', function (req, res) {

      const static_url = process.env.FRONT_STATIC_URL || '/upload/';
      const api_timeout = process.env.FRONT_TIMEOUT || 8000;

      res.json(
        {
          app,
          description,
          version,
          static_url,
          api_timeout
        });
    });
};
