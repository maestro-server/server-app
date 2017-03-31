

module.exports = function (flow, count, limit, page) {

    return new Promise((resolve, reject) => {

        const pages = Math.ceil(count/limit);

        if (page > pages)
            reject();

        resolve(flow);

    });
};
