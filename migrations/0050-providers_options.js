'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
            'type': ['full', 'parcial'],
            'permissions': {
                'AWS': {
                    'server-list': [
                        {'access': 'describe-instances', 'caller': 'ec2'}
                    ],
                    'loadbalance-list': [
                        {'access': 'describe-load-balancers', 'caller': 'ec2'},
                        {'access': 'describe-target-groups', 'caller': 'ec2'},
                        {'access': 'describe-target-health', 'caller': 'ec2'},
                        {'access': 'describe-auto-scaling-groups', 'caller': 'ec2'}
                    ],
                    'dbs-lists': [
                        {'access': 'describe-db-instances', 'caller': 'rds'}
                    ],
                    'storage-object-list': [
                        {'access': 'list-buckets', 'caller': 's3api'}
                    ],
                    'cdns-list': [
                        {'access': 'list_distributions', 'caller': 'ec2'}
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
