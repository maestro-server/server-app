'use strict';

const _ = require('lodash');

module.exports = (data) => (Entity) => (e) => {
    const access = _.pick(e, ['owner', 'created_at', Entity.access]);
    return _.assign({}, data, access);
};
