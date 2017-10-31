'use strict';

module.exports = function () {

    const mapError = {
      NotFoundError: 404,
      ConflictError: 409,
      PermissionError: 400,
      ValidatorError: 422,
      HTTPError: 500
    };

    return function (err, req, res, next) {
        const code = mapError[err.name] || 500;
        res.status(code).json({err:err.errors});

        if(code === 500) {
            console.log(err);
        }
        next();
    };
};
