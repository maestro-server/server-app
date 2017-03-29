
import merger from './mergeTransform';

exports.active = function (trans={}) {

  return merger(trans, {active:true});
};

exports.desactive = function (trans={}) {

  return merger(trans, {active:false});
};
