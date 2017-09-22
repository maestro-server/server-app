'use strict';

const _ = require('lodash');

module.exports = (data) => (Entity) => (e) => {
   return _.assign({}, data, _.pick(e, ['owner', 'created_at', Entity.access]));
};
