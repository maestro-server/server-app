'use strict';

const _ = require('lodash');
const PermissionError = require('core/errors/factoryError')('PermissionError');

module.exports = function (e) {

    return new Promise((resolve) => {

        if (_.isEmpty(e))
            throw new PermissionError('You not authorize to do this!');

        resolve(e);

    });


};
