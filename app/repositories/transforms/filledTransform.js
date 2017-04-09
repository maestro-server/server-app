
const filled = require('filter-object');

module.exports = function (obj1={}, obj2={}) {

  return new Promise((resolve) => {

      resolve(filled(obj1, obj2));

  });
};
