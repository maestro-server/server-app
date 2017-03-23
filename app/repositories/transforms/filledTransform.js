
import filled from 'filter-object';

module.exports = function (obj1={}, obj2={}) {

  return new Promise((resolve, reject) => {

      resolve(filled(obj1, obj2));

  });
};
