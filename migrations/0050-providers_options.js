'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
            'permissions': {
                'AWS': {
                    'server-list': [
                        {
                            'access': 'describe_instances',
                            'command': 'ec2',
                            'entity': 'servers',
                            'vars': {
                                'pag': 'MaxResults'
                            }
                        }
                    ],
                    'loadbalance-list': [
                        {
                            'access': 'describe_load_balancers',
                            'command': 'elbv2',
                            'entity': 'applications',
                            'family': 'Loadbalances',
                            'vars': {
                                'pag': 'PageSize'
                            }
                        },
                        {
                            'access': 'describe_target_groups',
                            'command': 'elbv2',
                            'entity': 'applications',
                            'family': 'Loadbalances',
                            'vars': {
                                'pag': 'PageSize'
                            }
                        },
                        {
                            'access': 'describe_target_health',
                            'command': 'elbv2',
                            'entity': 'applications',
                            'family': 'Loadbalances',
                            'vars': {
                                'pag': 'PageSize'
                            }
                        },
                        {
                            'access': 'describe_auto_scaling_groups',
                            'command': 'elbv2',
                            'entity': 'applications',
                            'family': 'Loadbalances',
                            'vars': {
                                'pag': 'PageSize'
                            }
                        }
                    ],
                    'dbs-lists': [
                        {
                            'access': 'describe_db_instances',
                            'command': 'rds',
                            'entity': 'applications',
                            'family': 'Databases',
                            'vars': {
                                'pag': 'MaxRecords'
                            }
                        }
                    ],
                    'storage-object-list': [
                        {
                            'access': 'list_buckets',
                            'command': 's3api',
                            'entity': 'applications',
                            'family': 'ObjectStorage'
                        }
                    ],
                    'cdns-list': [
                        {
                            'access': 'list_distributions',
                            'command': 'cloudfront',
                            'entity': 'applications',
                            'family': 'CDN',
                            'vars': {
                                'pag': 'MaxItems'
                            }
                        }
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
