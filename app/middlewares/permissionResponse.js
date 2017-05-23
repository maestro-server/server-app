'use strict';

module.exports = function () {
    return function (err, req, res, next) {

        if(err.name === 'PermissionError') {
          res.status(400).json(err);
          next();
        }
        next(err);
    };
};
