'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
            'type': ['full', 'parcial'],
            'permissions': {
                'AWS': {
                    'server-list': [
                        {'access': 'describe-instances'}
                    ],
                    'loadbalance-list': [
                        {'access': 'describe-load-balancers'},
                        {'access': 'describe-target-groups'},
                        {'access': 'describe-target-health'},
                        {'access': 'describe-auto-scaling-groups'}
                    ],
                    'dbs-lists': [
                        {'access': 'describe-db-instances'}
                    ],
                    'storage-object-list': [
                        {'access': 'list-buckets'}
                    ],
                    'cdns-list': [
                        {'access': 'list_distributions'}
                    ]
                }
            }
        },
        "key": "providers",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'providers'}, [], {}, {remove: true}, next);
};
