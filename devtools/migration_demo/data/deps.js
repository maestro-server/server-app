'use strict';

const json = {

    "root": [
        {
            "name": "#name::lb-client-maestro-prd",
            "endpoint": "rest"
        }
    ],
    "#name::lb-client-maestro-prd": [
        {
            "name": "#name::WebClient SPA Maestro",
            "endpoint": "rest"
        }
    ],
    "#name::WebClient SPA Maestro": [
        {
            "name": "#name::lb-server-maestro-prd",
            "endpoint": "rest"
        },
        {
            "name": "#name::Audit API",
            "endpoint": "rest"
        }
    ],
    "#name::lb-server-maestro-prd": [
        {
            "name": "#name::WebServer Maestro",
            "endpoint": "rest"
        }
    ],
    "#name::WebServer Maestro": [
        {
            "name": "#name::Discovery API",
            "endpoint": "rest"
        },
        {
            "name": "#name::Reports API",
            "endpoint": "rest"
        },
        {
            "name": "#name::Analytics API",
            "endpoint": "rest"
        },
        {
            "name": "#name::DB - MongoDB",
            "endpoint": "tcp"
        }
    ],
    "#name::Discovery API": [
        {
            "name": "#name::SQS - XXX",
            "endpoint": "amqp"
        },
        {
            "name": "#name::Data API",
            "endpoint": "tcp"
        }
    ],
    "#name::Reports API": [
        {
            "name": "#name::SQS - XXX",
            "endpoint": "amqp"
        },
        {
            "name": "#name::Data API",
            "endpoint": "tcp"
        }
    ],
    "#name::Analytics API": [
        {
            "name": "#name::SQS - XXX",
            "endpoint": "amqp"
        },
        {
            "name": "#name::Data API",
            "endpoint": "tcp"
        }
    ],
    "#name::SQS - XXX": [
        {
            "name": "#name::Discovery Workers",
            "endpoint": "amqp"
        },
        {
            "name": "#name::Reports Workers",
            "endpoint": "amqp"
        },
        {
            "name": "#name::Analytics Workers",
            "endpoint": "amqp"
        }
    ],
    "#name::Discovery Workers": [
        {
            "name": "#name::DB - MongoDB",
            "endpoint": "tcp"
        },
        {
            "name": "#name::WebSocket API",
            "endpoint": "tcp"
        },
        {
            "name": "#name::Data API",
            "endpoint": "tcp"
        }
    ],
    "#name::Reports Workers": [
        {
            "name": "#name::DB - MongoDB",
            "endpoint": "tcp"
        },
        {
            "name": "#name::WebSocket API",
            "endpoint": "tcp"
        },
        {
            "name": "#name::Data API",
            "endpoint": "tcp"
        }
    ],
    "#name::Analytics Workers": [
        {
            "name": "#name::DB - MongoDB",
            "endpoint": "tcp"
        },
        {
            "name": "#name::WebSocket API",
            "endpoint": "tcp"
        },
        {
            "name": "#name::Analytics Front",
            "endpoint": "tcp"
        },
        {
            "name": "#name::Data API",
            "endpoint": "tcp"
        }
    ],
    "#name::Data API": [
        {
            "name": "#name::DB - MongoDB",
            "endpoint": "tcp"
        }
    ],
    "#name::Audit API": [
        {
            "name": "#name::DB - MongoDB",
            "endpoint": "tcp"
        }
    ]
};

module.exports = json;
