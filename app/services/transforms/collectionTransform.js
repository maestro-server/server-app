

module.exports = function (data, limit, skip) {

    return new Promise((resolve, reject) => {

console.log(limit);
        resolve(
          { 'count': data[1],
            {limit},
            'itens': data[0]}
        );

    });
};
