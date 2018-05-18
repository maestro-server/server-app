'use strict';

const NotFoundError = require('core/errors/factoryError')('NotFoundError');


module.exports = function (flow, count, limit, page) {
    const pages = Math.ceil(count/limit);

    if (page > pages && count == 0)
        throw new NotFoundError(`Data not found`);

    return flow;
};
