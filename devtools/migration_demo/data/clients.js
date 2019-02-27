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

const datac = _.map(merge, (v) => _.assign({}, template, v));

module.exports = datac;
