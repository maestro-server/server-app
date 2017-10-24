'use strict';

const {name:app, version, description} = require('../../../package.json');

module.exports = function (router) {

    router.get('/', function (req, res) {

      res.json(
        {
          app,
          description,
          version
        });
    });
};
