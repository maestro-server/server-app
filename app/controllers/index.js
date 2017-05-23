'use strict';


module.exports = function (router) {

    router.get('/', function (req, res) {
      res.json({app:"Maestro Server", version: "0.1.0"})
    });

};
