'use strict';

const _ = require('lodash');

module.exports = function (query, field = 'query') {
  if(query.hasOwnProperty(field) && _.isString(query[field])) {

    try {
      query[field] = JSON.parse(_.get(query, field));
    } catch(e) {
      return {};
    }
  }

  return query;
};
