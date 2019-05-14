'use strict';

module.exports = function () {
    return function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE,PATCH");
      res.header("Access-Control-Allow-Headers", "*");
      next();
    };
};
