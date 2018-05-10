'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');

    pets.insert({
        "value": {
            period: ['seconds', 'minutes', 'hours', 'days'],
            period_type: ['interval', 'crontab'],
            method: ['GET', 'POST', 'PUT', 'DELETE'],
            kwargs: ['expires', 'max_targets'],
            modules: ['webhook', 'connections'],
            configs: [
                {
                    name: 'connections',
                    description: 'Polling provider',
                    source: 'discovery-app',
                    url: "<url_discovery>/crawler/<provider>/<_id>/<task>",
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
                        'cdns-list': {
                            every: 5,
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
                        'network-list': {
                            every: 7,
                            period: 'days'
                        }
                    }
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

    pets.findAndModify({key: 'scheduler_options'}, [], {}, {remove: true}, next);
};
