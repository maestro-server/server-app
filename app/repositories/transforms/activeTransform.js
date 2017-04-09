'use strict';

const merger = require('./mergeTransform');

exports.active = function (trans={}) {

  return merger(trans, {active:true});
};

exports.desactive = function (trans={}) {

  return merger(trans, {active:false});
};
