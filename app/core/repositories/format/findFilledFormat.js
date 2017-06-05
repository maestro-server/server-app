'use strict';

const _ = require('lodash');
const activeTransform = require('./activeFormat');

module.exports = (filters, filled) => {

    filters = _.pick(filters, filled);
    _.extend(filters, activeTransform.active());

    return filters;
}
