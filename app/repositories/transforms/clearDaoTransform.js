
module.exports = function (collection) {

  return new Promise((resolve, reject) => {

    Object.keys(collection).forEach(function(key) {
        collection[key] = collection[key].get();
    });

    resolve(collection);

  });
};
