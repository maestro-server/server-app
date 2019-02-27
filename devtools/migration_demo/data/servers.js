'use strict';

const _ = require('lodash');
const uuidv4 = require('./uuidv4');
const ip = require('./ip');

const blue = [
    {
        "prefix": "lb-",
        "services": [
            [{"name": "Ngnix", "version": "1.14"}],
            [{"name": "Haproxy", "version": "1.7"}]
        ],
        "role": "Loadbalance",
        "__sizeinc": 0,
        "__qtd": 1,
        "applications": ['#name::WebClient SPA Maestro', '#name::Landing Pages']
    },
    {
        "prefix": "web-front-",
        "services": [
            [{"name": "Ngnix", "version": "1.14"}, {"name": "NodeJs", "version": "8.11"}]
        ],
        "role": "Application",
        "__sizeinc": 0,
        "__qtd": 6,
        "applications": ['#name::WebClient SPA Maestro', '#name::Landing Pages']
    },
    {
        "prefix": "landingpages-",
        "services": [
            [{"name": "Varnish", "version": "2.24"}, {"name": "Ngnix", "version": "1.14"}]
        ],
        "role": "Application",
        "__sizeinc": 0,
        "__qtd": 6,
        "applications": ['#name::Landing Pages']
    },
    {
        "prefix": "wsocket-front-",
        "role": "Application",
        "services": [
            [{"name": "Ngnix", "version": "1.14"}, {"name": "Go"}]
        ],
        "__sizeinc": 0,
        "__qtd": 3,
        "applications": ['#name::WebSocket API']
    },
    {
        "prefix": "backend-nodejs-",
        "role": "Application",
        "services": [
            [{"name": "Ngnix", "version": "1.14"}, {"name": "NodeJs", "version": "8.11"}]
        ],
        "__sizeinc": 1,
        "__qtd": 15,
        "applications": ['#name::WebServer Maestro', '#name::Audit API', '#name::Analytics Front']
    },
    {
        "prefix": "backend-python-",
        "role": "Application",
        "services": [
            [{"name": "Python", "version": "3.6"}]
        ],
        "__sizeinc": 4,
        "__qtd": 15,
        "applications": ['#name::Discovery API', '#name::Discovery Workers',
            '#name::Reports API', '#name::Reports Workers', '#name::Analytics API', '#name::Analytics Workers', '#name::Data API']
    },
    {
        "prefix": "hotsites-php-",
        "role": "Application",
        "services": [
            [{"name": "Apache", "version": "2.15"}, {"name": "PHP", "version": "7.1"}]
        ],
        "__sizeinc": 1,
        "__qtd": 6,
        "applications": ['#name::Discovery API', '#name::Discovery Workers',
            '#name::Reports API', '#name::Reports Workers', '#name::Analytics API', '#name::Analytics Workers', '#name::Data API']
    },
    {
        "prefix": "erp-java-",
        "role": "Application",
        "services": [
            [{"name": "Java", "version": "8"}]
        ],
        "__sizeinc": 1,
        "__qtd": 3,
        "applications": ['#name::WebApp - ERP']
    },
    {
        "prefix": "rabbitmq-backend-",
        "role": "Standard",
        "services": [
            [{"name": "RabbitMQ", "version": "1"}]
        ],
        "__sizeinc": 1,
        "__qtd": 2,
        "applications": ['#name::RabbitMQ - Dev']
    },
    {
        "prefix": "redis-backend-",
        "role": "Cache",
        "services": [
            [{"name": "Java", "version": "8"}]
        ],
        "__sizeinc": 1,
        "__qtd": 2,
        "applications": ['#name::Redis - Development']
    },
    {
        "prefix": "mongodb-backend-",
        "role": "Database",
        "services": [
            [{"name": "MongoDB", "version": "4"}]
        ],
        "__sizeinc": 4,
        "__qtd": 1,
        "env": ["Staging", "Development"],
        "applications": ['#name::DB - MongoDB [Staging]', '#name::DB - MongoDB [Developing]']
    },
    {
        "prefix": "oracle-erp-",
        "role": "Database",
        "services": [
            [{"name": "Oracle Database", "version": "12"}]
        ],
        "__sizeinc": 6,
        "__qtd": 8,
        "applications": ['#name::ASM - Manager', '#name::Oracle - ERP - Prd']
    }
]

const os = [
    {"base": "Linux", "dist": "UbuntuServer", "version": "18.04-LTS"},
    {"base": "Linux", "dist": "CentOS", "version": "7"},
    {"base": "Linux", "dist": "CentOS", "version": "7"},
    {"base": "Linux", "dist": "CentOS", "version": "7"},
    {"base": "Windows", "dist": "Enterprise", "version": "10"}
]

const env = ["Production", "Production", "Production", "Staging", "Development", "UTA", "SandBox"]

const storage = [
    '#attach',
    '#attach',
    '#attach',
    '#attach',
    '#built',
    '#built',
    '#skip'
]


// ============================================ starting
let servers = []

function createTemplate(obj, ix) {
    let template = {
        "unique_id": "i-" + uuidv4('xxxxxxxxxxxxxxxxx'),
        "hostname": _.get(obj, 'prefix') + uuidv4('xxxxxxxxxxxxxxxxx') + '-' + ix,
        "role": _.get(obj, 'role'),
        "ipv4_private": ip(),
        "ipv4_public": ip(true),
        "environment": _.has(obj, 'env') ? obj['env'][_.random(0, obj['env'].length-1)] : env[_.random(0, env.length-1)],
        "os": os[_.random(0, os.length-1)],
        "auth": [
            {
                "name": "maestro",
                "type": "PKI"
            }
        ],
        "tags": [
            {
                "key": "Name",
                "value": _.get(obj, 'prefix').slice(0, -1)
            }
        ],
        "services": obj['services'][_.random(0, obj['services'].length-1)],
        "status": "Active",
        "cpu": _.random(1, 8) + (obj.__sizeinc * 2),
        "memory": _.random(2, 36) + (obj.__sizeinc * 3)
    };

    let tstorage = []
    for (let isx = 0; isx < 2; isx++) {
        tstorage.push(storage[_.random(0, storage.length-1)]);
    }
    _.set(template, "storage", tstorage);

    if(_.has(obj, 'applications')) {
        _.set(template, "applications", _.get(obj, 'applications'));
    }

    return template;
}

function populate(ex = 1) {

    _.forEach(blue, (obj) => {
        let lp = _.get(obj, '__qtd') * ex

        for(let ix=0; ix<=lp; ix++) {
            servers.push(createTemplate(obj, ix));
        }
    });
}

populate(1);
populate(1);
populate(1);

module.exports = servers;
