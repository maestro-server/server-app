'use strict';

const createLinkPagination = require('../helpers/createLinkPagination');
const insertHateoasCollection = require('../helpers/insertHateoasCollection');

module.exports = function (data, count, uri="", limit=20, page=1) {

    return new Promise((resolve) => {

        const pages = Math.ceil(count/limit);

        const trans = {
            'found': count,
            'limit': limit,
            'total_pages': pages,
            'current_page': page,
            'items': insertHateoasCollection(data, uri),
            '_links': createLinkPagination(uri, limit, pages, page)
        };

        resolve(trans);

    });
};
