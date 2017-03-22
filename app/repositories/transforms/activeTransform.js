

exports.active = function (trans={}) {

  return new Promise((resolve, reject) => {
      resolve(Object.assign(trans, {active:true}));
  });
};

exports.desactive = function (trans={}) {

  return new Promise((resolve, reject) => {
      resolve(Object.assign(trans, {active:false}));
  });
};
