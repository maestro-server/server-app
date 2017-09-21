'use strict';

const PermissionError = require('core/errors/factoryError')('PermissionError');

module.exports = function (e) {

    return new Promise((resolve) => {

        if (e.hasOwnProperty('isUpdater') && e.isUpdater.n < 1)
            throw new PermissionError('You not authorize to do this!');

        resolve(e);

    });


};
