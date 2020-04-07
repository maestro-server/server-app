'use strict';

const {name:app, version, description} = require('../../../package.json');
const authenticate = require('identity/middlewares/authenticate');
const healthCheckApplication = require('core/applications/healthCheckApplication')();

module.exports = function (router) {

    router.get('/', function (req, res) {
      const bag = {
        'api_timeout': process.env.MAESTRO_TIMEOUT || 10000
      };

      res.json(
        {
          app,
          description,
          version,
          ...bag
        });
    });

    router.get('/versions', authenticate(), healthCheckApplication.ping);
};
