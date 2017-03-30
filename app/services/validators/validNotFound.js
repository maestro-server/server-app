

module.exports = function (data, limit, page) {

    return new Promise((resolve, reject) => {

        const pages = Math.ceil(data[1]/limit);

        if (page > pages)
            reject();

        resolve(data);

    });
};
