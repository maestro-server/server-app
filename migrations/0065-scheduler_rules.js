'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');

    pets.insertOne({
        "value": {
            period: ['seconds', 'minutes', 'hours', 'days', 'weeks'],
            period_type: ['interval', 'cron'],
            method: ['GET', 'POST', 'PUT', 'DELETE'],
            modules: ['webhook', 'connections', 'reports'],
            configs: [
                {
                    name: 'connections',
                    description: 'Polling provider',
                    source: 'discovery',
                    url: "crawler/<provider>/<_id>/<task>",
                    method: 'PUT',
                    options: {
                        'server-list': {
                            every: 5,
                            period: 'minutes'
                        },
                        'loadbalance-list': {
                            every: 6,
                            period: 'hours'
                        },
                        'autoscaling-list': {
                            every: 24,
                            period: 'hours'
                        },
                        'autoscaling-support-list': {
                            every: 24,
                            period: 'hours'
                        },
                        'dbs-list': {
                            every: 24,
                            period: 'hours'
                        },
                        'storage-object-list': {
                            every: 24,
                            period: 'hours'
                        },
                        'volumes-list': {
                            every: 6,
                            period: 'hours'
                        },
                        'storage-list': {
                            every: 5,
                            period: 'hours'
                        },
                        'cdns-list': {
                            every: 5,
                            period: 'days'
                        },
                        'brokers-list': {
                            every: 5,
                            period: 'days'
                        },
                        'smtp-list': {
                            every: 1,
                            period: 'days'
                        },
                        'cache-list': {
                            every: 1,
                            period: 'days'
                        },
                        'container-orchestration-list': {
                            every: 1,
                            period: 'days'
                        },
                        'snapshot-list': {
                            every: 14,
                            period: 'days'
                        },
                        'images-list': {
                            every: 14,
                            period: 'days'
                        },
                        'security-list': {
                            every: 6,
                            period: 'hours'
                        },
                        'serverless-list': {
                            every: 12,
                            period: 'hours'
                        },
                        'serverless-support-list': {
                            every: 24,
                            period: 'hours'
                        },
                        'search-list': {
                            every: 5,
                            period: 'days'
                        },
                        'dynamodb-list': {
                            every: 3,
                            period: 'days'
                        },
                        'gateway-list': {
                            every: 3,
                            period: 'days'
                        },
                        'network-list': {
                            every: 7,
                            period: 'days'
                        },
                        'flavor-list': {
                            every: 14,
                            period: 'days'
                        },
                    }
                },
                {
                    name: 'reports',
                    description: 'Polling reports',
                    source: 'report',
                    url: "reports/<report>",
                    method: 'PATCH'
                },
                {
                    name: 'webhook',
                    description: 'Make http request'
                }
            ]
        },
        "key": "scheduler_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findOneAndDelete({key: 'scheduler_options'}, next);
};
