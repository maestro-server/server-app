'use strict';

const _ = require('lodash');

const template = {
    "name": "Maestro",
    email: "maestro@team.com"
};


const merge = [
    {
        "name": "SRE - Engineers"
    },
    {
        "name": "SysAdmin"
    },
    {
        "name": "Developer"
    },
    {
        "name": "Mananger"
    },
    {
        "name": "Architecture"
    }
];

const data = _.map(merge, (v) => _.assign({}, template, v));

module.exports = data;
