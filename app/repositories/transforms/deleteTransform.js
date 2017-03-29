
module.exports = function (val, del=[]) {

  del.forEach((e) => {
    if (e in val)
      delete val[e];
  });

  return val;
};
