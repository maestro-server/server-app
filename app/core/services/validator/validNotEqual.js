'use strict';

module.exports = function (filter, fielder, id) {

  return Object.assign({}, filter, {[fielder]: {$ne : id}});
};
