'use strict';

const PermissionError = require('core/errors/factoryError')('PermissionError');


module.exports = function (e) {

    return new Promise((resolve) => {

        if (!e)
            throw new PermissionError('You not authorize to do this!');

        resolve(e);

    });


};
