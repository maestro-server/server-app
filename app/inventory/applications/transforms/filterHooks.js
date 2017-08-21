'use strict';

const _ = require('lodash');

const swapModule = (obj, omits, data) => {
    omits.push(data.source);

    if(!_.isEmpty(obj[data.source])) {
        return {[data.dest]: obj[data.source]};
    }
}

module.exports = function (query, field = 'query', rules = []) {
  if(query.hasOwnProperty(field)) {
    let omits = [];

    const filters = rules.map((data) => {
        if(data.module == 'swap') {
            return swapModule(query[field], omits, data);
        }

        if(_.hasOwnProperty(data.module)) {
            query[field][data.source] = _[data.module](query[field][data.source]);
        }
    });

    query[field] = _.omit(query[field], omits);
    _.merge(query, ...filters);
  }

  return query;
};


