'use strict';

const _ = require('lodash');

module.exports = function (obj1={}, obj2={}) {

  return new Promise((resolve) => {
      resolve(_.pick(obj1, obj2));
  });
};
