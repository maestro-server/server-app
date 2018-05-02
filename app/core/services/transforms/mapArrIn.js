'use strict';

const _ = require('lodash');

module.exports = function (query) {

    const obj = _.mapValues(query, (ett) => {
        if(_.isArray(ett)) {
            ett = {$in: ett};
        };

        return ett;
    });

    return obj;
};
