'use strict';

const PermissionError = require('core/errors/factoryError')('PermissionError');
const _ = require('lodash');


module.exports = function (e) {
      if (_.isEmpty(e))
          throw new PermissionError('You not authorize to do this!');
      return e;
};
