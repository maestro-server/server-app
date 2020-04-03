'use strict';

const _ = require('lodash');

module.exports = function () {

    const mapError = {
      NotFoundError: 404,
      ConflictError: 409,
      PermissionError: 400,
      ProcessError: 400,
      ValidatorError: 422,
      HTTPError: 501,
      ServiceDisabledError: 200,
      ResourceError: 501
    };

    const logs = ['ServiceDisabledError'];
    const codeLogs = [500];

    return function (err, req, res, next) {
        const mapp = mapError[err.name];
        const code = mapp || 500;

        if(!mapp) {
            err = err.toString();
        }

        res.status(code).json({err});

        if(logs.indexOf(_.get(err, 'name')) !== -1)
            console.error("-------> ", _.get(err, 'errors'));

        if(codeLogs.indexOf(_.get(err, 'name')) !== -1)
            console.error(err);

        next();
    };
};
