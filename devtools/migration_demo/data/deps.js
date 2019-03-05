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
    ],
    "#name::WebApp - ERP": [
        {
            "name": "#name::Oracle - ERP - Prd",
            "endpoint": "tcp"
        }
    ],
    "#name::Oracle - ERP - Prd": [
        {
            "name": "#name::ASM - Manager",
            "endpoint": "tcp"
        }
    ],
    "#name::CloudFlare - Hotsites": [
        {
            "name": "#name::Hotsites",
            "endpoint": "http"
        }
    ],
    "#name::Hotsites": [
        {
            "name": "#name::MySQL - HotSites - Prd",
            "endpoint": "tcp"
        }
    ],

    "#name::ChatBot - Slack": [
        {
            "name": "#name::IA - NPL - ChatBot",
            "endpoint": "tcp"
        },
        {
            "name": "#name::Autheticator - Order",
            "endpoint": "tcp"
        }
    ],
    "#name::IA - NPL - ChatBot": [
        {
            "name": "#name::Lambda - Order Catalog",
            "endpoint": "rest"
        },
        {
            "name": "#name::Lambda - Order Fullfilment",
            "endpoint": "rest"
        },
        {
            "name": "#name::Lambda - Handler Error",
            "endpoint": "rest"
        },
        {
            "name": "#name::Lambda - Order Outage",
            "endpoint": "rest"
        }
    ],
    "#name::Lambda - Order Catalog": [
        {
            "name": "#name::DB - Order",
            "endpoint": "tcp"
        }
    ],
    "#name::Lambda - Order Fullfilment": [
        {
            "name": "#name::DB - Order",
            "endpoint": "tcp"
        }
    ],
    "#name::Lambda - Handler Error": [
        {
            "name": "#name::Lambda - Parsers",
            "endpoint": "tcp"
        }
    ],
    "#name::Lambda - Order Outage": [
        {
            "name": "#name::DB - Order",
            "endpoint": "tcp"
        }
    ],
    "#name::API Gateway - Bot": [
        {
            "name": "#name::Backend - ChatBot",
            "endpoint": "tcp"
        }
    ],
    "#name::Client - Admin - ChatBot": [
        {
            "name": "#name::API Gateway - Bot",
            "endpoint": "tcp"
        }
    ],
    "#name::Lambda - Parsers": [
        {
            "name": "#name::CloudLogs - ChatBot",
            "endpoint": "tcp"
        }
    ]

};

module.exports = json;
