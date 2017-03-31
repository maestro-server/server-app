
import BASE from '../../helpers/base_url';

module.exports = function (uri, limit, pages, page) {

    let links = {
        "self": {
          'href': `${BASE}/${uri}/?page=${page}&limit=${limit}`,
          'method': 'GET'
        }
    };

    if (page > 1) {
        links.prev = {
          'href': `${BASE}/${uri}/?page=${page-1}&limit=${limit}`,
          'method': 'GET'
        }
    }

    if (page < pages) {
        links.next = {
          'href': `${BASE}/${uri}/?page=${page+1}&limit=${limit}`,
          'method': 'GET'
        }
    }

    if (pages <= 1) {
        links.first = {
          'href': `${BASE}/${uri}/?page=1&limit=${limit}`,
          'method': 'GET'
        }

        links.last = {
          'href': `${BASE}/${uri}/?page=${pages}&limit=${limit}`,
          'method': 'GET'
        }
    }

    return links;
};
