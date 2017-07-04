'use strict';

module.exports = function (fielder, id) {

  return Object.assign({}, {[fielder]: {$ne : id}});
};
