'use strict';
const _ = require('lodash');

const json = [
    {
        "apps": ["#name::ChatBot - Slack", "#name::Client - Admin - ChatBot"],
        "name": "Serverless - ChatBot",
        "type": "bussiness",
        "tab": 2
    },
    {
        "apps": ["#name::Discovery API"],
        "name": "Discovery - Architecture",
        "type": "bussiness",
        "tab": 2
    },
    {
        "apps": ["#name::WebServer Maestro"],
        "name": "Backend- Architecture",
        "type": "bussiness",
        "tab": 2
    },
    {
        "apps": ["#name::lb-client-maestro-prd"],
        "name": "Maestro Server - Architecture",
        "type": "bussiness",
        "tab": 2
    },
    {
        "apps": ["#name::WebApp - ERP"],
        "name": "ERP[Java] - Architecture",
        "type": "bussiness",
        "tab": 2
    },
    {
        "apps": ["#name::CloudFlare - Hotsites"],
        "name": "Wordpress - Architecture",
        "type": "bussiness",
        "tab": 2
    }
];

_.reverse(json);
module.exports = json;
