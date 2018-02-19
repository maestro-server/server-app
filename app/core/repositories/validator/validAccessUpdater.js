'use strict';

const PermissionError = require('core/errors/factoryError')('PermissionError');
const _ = require('lodash');

module.exports = function (e) {
    if (_.has(e, 'isUpdater') && e.isUpdater.n < 1)
        throw new PermissionError('You not authorize to do this!');

    return e;
};
