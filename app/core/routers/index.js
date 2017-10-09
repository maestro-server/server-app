'use strict';


module.exports = function (router) {

    router.get('/', function (req, res) {
      res.json(
        {
          app:process.env.npm_package_name,
          description:process.env.npm_package_description,
          version: process.env.npm_package_version
        });
    });
};
