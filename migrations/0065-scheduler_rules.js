'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
            period: ['seconds', 'minutes', 'hours', 'days', 'weeks'],
            period_type: ['interval', 'crontab'],
            method: ['GET', 'POST', 'PUT', 'DELETE'],
            kwargs: ['expires', 'max_targets'],
            modules: [
                {
                    name: 'connections',
                    description: 'Polling provider',
                    source: 'discovery-app',
                    url: 'http://discovery-app/crawler/<provider>/<_id>/<task>',
                    method: 'PUT',
                    options: ['server-list', 'loadbalance-list', 'dbs-list',
                    'storage-object-list', 'volumes-list', 'cdns-list', 'snapshot-list', 'images-list',
                    'security-list', 'network-list']
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
