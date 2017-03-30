
import NotFoundError from '../../errors/notFoundError';

module.exports = function (data, limit, page) {

    return new Promise((resolve, reject) => {

        const pages = Math.round(data[1]/limit);

        if (page > pages)
            reject();

        resolve(data);

    });
};
