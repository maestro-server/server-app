'use strict';

const _ = require('lodash');

const template = {
    "name": "Maestro - Clients",
    "clients": ["#client[Maestro]"],
    "roles": ["#user"],
    "owner": "#user",
    "active": true,
    "created_at": "#date",
    "updated_at": "#date"
}


const merge = [
    {
        "name": "Maestro - Clients"
    },
    {
        "name": "Maestro - Servers"
    },
    {
        "name": "Maestro - Discovery"
    },
    {
        "name": "Maestro - Reports"
    },
    {
        "name": "Maestro - Analytics"
    },
    {
        "name": "Maestro - Data"
    },
    {
        "name": "Maestro - Audit"
    },
    {
        "name": "Maestro - WS"
    }
]

const data = _.map(merge, (v) => _.merge(template, v));

module.export = data;
