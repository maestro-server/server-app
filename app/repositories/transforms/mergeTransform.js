

module.exports = function (trans={}, merge={}) {

  return new Promise((resolve, reject) => {
      resolve(Object.assign(trans, merge));
  });
};
