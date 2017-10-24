'use strict';

const _ = require('lodash');

module.exports = function (query) {
    const filter = _.pickBy(query, _.identity);

    const result =  _.map(filter,
      (o, k) => ({[k]: {$regex: o, '$options': 'i'}})
    );

    return _.isEmpty(result) ? [] : result;
};
