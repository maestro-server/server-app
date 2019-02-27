'use strict';

const _ = require('lodash');

const template = {
    "name": "Maestro - Clients"
}


const merge = [
    {
        "name": "Maestro - Clients",
        "clients": ["#name::Maestro"]
    },
    {
        "name": "Maestro - Servers",
        "clients": ["#name::Maestro"]
    },
    {
        "name": "Maestro - Discovery",
        "clients": ["#name::Maestro"]
    },
    {
        "name": "Maestro - Reports",
        "clients": ["#name::Maestro"]
    },
    {
        "name": "Maestro - Analytics",
        "clients": ["#name::Maestro"]
    },
    {
        "name": "Maestro - Data",
        "clients": ["#name::Maestro"]
    },
    {
        "name": "Maestro - Audit",
        "clients": ["#name::Maestro"]
    },
    {
        "name": "Maestro - WS",
        "clients": ["#name::Maestro"]
    }
]

const data = _.map(merge, (v) => _.assign({}, template, v));

module.exports = data;
