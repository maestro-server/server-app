'use strict';

const _ = require('lodash');


module.exports = function (query, field = 'query', rules = []) {
    if (query.hasOwnProperty(field)) {
        let omits = [];

        for (let rule in rules) {
            const data = rules[rule];
            const tmp = _.get(query[field], data.source);

            if (tmp) {
                if (data.module == 'swap') {
                    query[field][data.dest] = tmp;
                    omits.push(data.source);
                    continue;
                }

                if (data.module == 'clone') {
                    _.set(query[field], data.dest, tmp);
                    continue;
                }

                if (_.hasOwnProperty(data.module)) {
                    query[field][data.source] = _[data.module](tmp);
                }
            }
        }

        query[field] = _.omit(query[field], omits);
    }


    return query;
};


