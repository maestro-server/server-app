'use strict';

const factoryObjHateoas = require('./factoryObjHateoas');

module.exports = function (uri, limit, pages, page) {
    const prefix = `/${uri}/?page`;

    let links = factoryObjHateoas('_self', `${prefix}=${page}&limit=${limit}`);

    if (page > 1) {
        Object.assign(links,
            factoryObjHateoas('prev', `${prefix}=${page-1}&limit=${limit}`));
    }

    if (page < pages) {
        Object.assign(links,
            factoryObjHateoas('next', `${prefix}=${page+1}&limit=${limit}`));
    }

    if (pages > 1) {
        Object.assign(links,
            factoryObjHateoas('first', `${prefix}=1&limit=${limit}`),
            factoryObjHateoas('last', `${prefix}=${pages}&limit=${limit}`)
        );
    }

    return links;
};
