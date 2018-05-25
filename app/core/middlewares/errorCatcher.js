'use strict';

module.exports = function () {

    const mapError = {
      NotFoundError: 404,
      ConflictError: 409,
      PermissionError: 400,
      ValidatorError: 422,
      HTTPError: 501,
      ResourceError: 501
    };

    return function (err, req, res, next) {
        const mapp = mapError[err.name];
        const code = mapp || 500;

        if(!mapp) {
            err = err.toString();
        }

        res.status(code).json({err});

        if(code === 500) {
            console.error(err);
        }
        next();
    };
};
