'use strict';

const _ = require('lodash');

const makeName = (name, ext) => {
    const fname = _.chain(name.split('.'))
        .head()
        .kebabCase()
        .value();

    return `${fname}.${ext}`;
};

module.exports = makeName;
