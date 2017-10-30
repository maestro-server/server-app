'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
            'permissions': {
                'AWS': {
                    'server-list': [
                        {'access': 'describe_instances', 'command': 'ec2'}
                    ],
                    'loadbalance-list': [
                        {'access': 'describe_load_balancers', 'command': 'elbv2'},
                        {'access': 'describe_target_groups', 'command': 'elbv2'},
                        {'access': 'describe_target_health', 'command': 'elbv2'},
                        {'access': 'describe_auto_scaling_groups', 'command': 'elbv2'}
                    ],
                    'dbs-lists': [
                        {'access': 'describe_db_instances', 'command': 'rds'}
                    ],
                    'storage-object-list': [
                        {'access': 'list_buckets', 'command': 's3api'}
                    ],
                    'cdns-list': [
                        {'access': 'list_distributions', 'command': 'cloudfront'}
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
