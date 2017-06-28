 'use strict';

 module.exports = function () {
    return function (err, req, res, next) {

        if(err.name === 'NotFoundError') {
          res.status(404).json(err);
          next();
        }
        next(err);
    };
};
