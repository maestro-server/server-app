'use strict';

const _ = require('lodash');

module.exports = function (query, field = 'query', rules = []) {
  if(query.hasOwnProperty(field)) {
    let omits = [];

    const filters = rules.map((data) => {
      omits.push(data.source);

      if(!_.isEmpty(query[field][data.source])) {
        return {[data.dest]: query[field][data.source]};
      }
    });

    query[field] = _.omit(query[field], omits);
    _.merge(query, ...filters);
  }

  return query;
};
