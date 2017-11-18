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
                            'single_result_path': 'Instances',
                            'key_comparer': 'datacenters.instance_id',
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
                            'result_path': 'LoadBalancers',
                            'key_comparer': 'name',
                            'vars': [
                              {'name':'PageSize', 'env': 'MAESTRO_SCAN_QTD', 'default': 100, 'type': 'int'}
                            ]
                        },
                        {
                            'access': 'describe_load_balancers',
                            'command': 'elb',
                            'entity': 'applications',
                            'result_path': 'LoadBalancerDescriptions',
                            'single_result_path': '',
                            'key_comparer': 'name',
                            'vars': [
                              {'name':'PageSize', 'env': 'MAESTRO_SCAN_QTD', 'default': 100, 'type': 'int'}
                            ]
                        }
                    ],
                    'dbs-list': [
                        {
                            'access': 'describe_db_instances',
                            'command': 'rds',
                            'entity': 'applications',
                            'result_path': 'DBInstances',
                            'vars': [
                                {'name':'MaxRecords', 'env': 'MAESTRO_SCAN_QTD', 'default': 100, 'type': 'int'}
                            ]
                        }
                    ],
                    'storage-object-list': [
                        {
                            'access': 'list_buckets',
                            'command': 's3',
                            'entity': 'applications',
                            'result_path': 'Buckets',
                            'key_comparer': 'name',
                            'vars': []
                        }
                    ],
                    'cdns-list': [
                        {
                            'access': 'list_distributions',
                            'command': 'cloudfront',
                            'entity': 'applications',
                            'result_path': 'DistributionList',
                            'vars': [
                                {'name':'MaxItems', 'env': 'MAESTRO_SCAN_QTD', 'default': 100, 'type': 'int'}
                            ]
                        }
                    ]
                },


                'OpenStack': {
                  'server-list': [
                      {
                          'access': 'servers',
                          'command': 'compute',
                          'entity': 'servers',
                          'result_path': '',
                          'single_result_path': '',
                          'key_comparer': 'datacenters.instance_id',
                          'vars': [
                            {'name':'limit', 'env': 'MAESTRO_SCAN_QTD', 'default': 100, 'type': 'int'}
                          ]
                      }
                  ],
                  'loadbalance-list': [
                      {
                          'access': 'load_balancers',
                          'command': 'load_balancer',
                          'entity': 'applications',
                          'result_path': '',
                          'single_result_path': '',
                          'key_comparer': 'name',
                          'vars': [
                              {'name':'limit', 'env': 'MAESTRO_SCAN_QTD', 'default': 100, 'type': 'int'}
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
