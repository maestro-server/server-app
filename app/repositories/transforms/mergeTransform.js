

module.exports = function (trans={}, merge={}) {

  return new Promise((resolve) => {
      resolve(Object.assign(trans, merge));
  });
};
