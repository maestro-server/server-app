
import createLinkPagination from '../helpers/createLinkPagination';
import insertHateoasCollection from '../helpers/insertHateoasCollection';

module.exports = function (data, limit, page, uri) {

    return new Promise((resolve, reject) => {

        const pages = Math.round(data[1]/limit);

        const trans = {
            'found': data[1],
            'limit': limit,
            'total_pages': pages,
            'current_page': page,
            'itens': insertHateoasCollection(data[0], uri),
            '_links': createLinkPagination(uri, limit, pages, page)
        };

        resolve(trans);

    });
};
