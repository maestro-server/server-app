'use strict';

const _ = require('lodash');
const NotFoundError = require('core/errors/notFoundError');

module.exports = function (e) {

    return new Promise((resolve) => {

        if (_.isEmpty(e))
            throw new NotFoundError('Not Found');

        resolve(e);

    });


};
