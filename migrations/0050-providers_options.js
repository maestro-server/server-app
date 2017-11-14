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
                            'result_path': 'Reservations',
                            'single_result_path': 'Instances.[0]',
                            'vars': [
                              {'name':'MaxResults', 'env': 'MAESTRO_SCAN_QTD', 'default': 100, 'type': 'int'}
                            ]
                        }
                    ],
                    'loadbalance-list': [
                        {
                            'access': 'describe_load_balancers',
                            'command': 'elbv2',
                            'entity': 'applications',
                            'family': 'Loadbalances',
                            'result_path': 'LoadBalancers',
                            'gi ': '',
                            'vars': [
                              {'name':'PageSize', 'env': 'MAESTRO_SCAN_QTD', 'default': 100, 'type': 'int'}
                            ]
                        },
                        {
                            'access': 'describe_target_groups',
                            'command': 'elbv2',
                            'entity': 'applications',
                            'family': 'Loadbalances',
                            'result_path': 'LoadBalancers',
                            'single_result_path': '',
                            'vars': [
                              {'name':'PageSize', 'env': 'MAESTRO_SCAN_QTD', 'default': 100, 'type': 'int'}
                            ]
                        },
                        {
                            'access': 'describe_target_health',
                            'command': 'elbv2',
                            'entity': 'applications',
                            'family': 'Loadbalances',
                            'single_result_path': '',
                            'vars': [
                                {'name':'PageSize', 'env': 'MAESTRO_SCAN_QTD', 'default': 100, 'type': 'int'}
                            ]
                        },
                        {
                            'access': 'describe_auto_scaling_groups',
                            'command': 'elbv2',
                            'entity': 'applications',
                            'family': 'Loadbalances',
                            'result_path': 'LoadBalancers',
                            'single_result_path': '',
                            'vars': [
                                {'name':'PageSize', 'env': 'MAESTRO_SCAN_QTD', 'default': 100, 'type': 'int'}
                            ]
                        }
                    ],
                    'dbs-lists': [
                        {
                            'access': 'describe_db_instances',
                            'command': 'rds',
                            'entity': 'applications',
                            'family': 'Databases',
                            'result_path': 'DBInstances',
                            'vars': [
                                {'name':'MaxRecords', 'env': 'MAESTRO_SCAN_QTD', 'default': 100, 'type': 'int'}
                            ]
                        }
                    ],
                    'storage-object-list': [
                        {
                            'access': 'list_buckets',
                            'command': 's3api',
                            'entity': 'applications',
                            'family': 'ObjectStorage',
                            'result_path': 'Buckets',
                            'vars': []
                        }
                    ],
                    'cdns-list': [
                        {
                            'access': 'list_distributions',
                            'command': 'cloudfront',
                            'entity': 'applications',
                            'family': 'CDN',
                            'result_path': 'DistributionList',
                            'vars': [
                                {'name':'MaxItems', 'env': 'MAESTRO_SCAN_QTD', 'default': 100, 'type': 'int'}
                            ]
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
