
import BASE from '../../helpers/base_url';

module.exports = function (uri, limit, pages, page) {

    let links = {
        "self": `${BASE}/${uri}/?page=${page}&limit=${limit}`,
        "first": `${BASE}/${uri}/?page=1&limit=${limit}`,
        "last": `${BASE}/${uri}/?page=${pages}&limit=${limit}`
    };

    if (page > 1)
        links.prev = `${BASE}/${uri}/?page=${page-1}&limit=${limit}`;

    if (page < pages)
        links.next = `${BASE}/${uri}/?page=${page+1}&limit=${limit}`;

    return links;
};
