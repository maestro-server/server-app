'use strict';

const _ = require('lodash');
const formtObjectId = require('../format/formatObjectId');

module.exports = function (data, fielder='members') {

  return new Promise((resolve) => {

      if(_.has(data, fielder) && !_.isEmpty(data[fielder])) {
        _.forIn(data[fielder], function(value, key) {

          if(_.has(value, '_id', 'name', 'email')) {
            value = _.defaults(value, { '_ref': 'users'}, {'role': 1});
            value = formtObjectId(value);
            data[fielder][key] = _.pick(value, ['_ref', '_id', 'name', 'email', 'role']);
          } else {
            delete data[fielder][key]; // insure to remove this
          }

        });
      }

      if(_.isEmpty(data[fielder])) {
        delete data[fielder];
      }

      resolve(data);
  });
};
