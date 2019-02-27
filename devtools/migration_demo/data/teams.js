'use strict';

const _ = require('lodash');

const template = {
    "name": "Maestro"
}


const merge = [
    {
        "name": "Maestro",
        "contacts": [
            {
                "channel": "Slack",
                "value": "maestroserver"
            }
        ]
    },
    {
        "name": "ERP",
        "contacts": [
            {
                "channel": "Email",
                "value": "it@mycompany.com"
            },
            {
                "channel": "HelpFresh",
                "value": "helpdesk.com.it"
            }
        ]
    },
    {
        "name": "Advertising agency",
        "contacts": [
            {
                "channel": "Asana",
                "value": "asana.com"
            }
        ]

    }
]

const data = _.map(merge, (v) => _.merge(template, v));

module.exports = data;
