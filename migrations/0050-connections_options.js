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
                                {'name': 'MaxResults', 'env': 'MAESTRO_SCAN_QTD', 'default': 200, 'type': 'int'}
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
                                {'name': 'PageSize', 'env': 'MAESTRO_SCAN_QTD', 'default': 200, 'type': 'int'}
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
                                {'name': 'PageSize', 'env': 'MAESTRO_SCAN_QTD', 'default': 200, 'type': 'int'}
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
                                {'name': 'MaxRecords', 'env': 'MAESTRO_SCAN_QTD', 'default': 200, 'type': 'int'}
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
                    'volumes-list': [
                        {
                            'access': 'describe_volumes',
                            'command': 'ec2',
                            'entity': 'volumes',
                            'result_path': 'Volumes',
                            'key_comparer': 'volume_id',
                            'vars': [
                                {'name': 'MaxResults', 'env': 'MAESTRO_SCAN_QTD', 'default': 200, 'type': 'int'}
                            ]
                        }
                    ],
                    'cdns-list': [
                        {
                            'access': 'list_distributions',
                            'command': 'cloudfront',
                            'entity': 'applications',
                            'result_path': 'DistributionList',
                            'vars': [
                                {'name': 'MaxItems', 'env': 'MAESTRO_SCAN_QTD', 'default': 200, 'type': 'int'}
                            ]
                        }
                    ],
                    'snapshot-list': [
                        {
                            'access': 'describe_snapshots',
                            'command': 'ec2',
                            'entity': 'snapshots',
                            'result_path': 'Snapshots',
                            'key_comparer': 'snapshot_id',
                            'vars': [
                                {'name': 'MaxResults', 'env': 'MAESTRO_SCAN_QTD', 'default': 200, 'type': 'int'}
                            ]
                        }
                    ],
                    'images-list': [
                        {
                            'access': 'describe_images',
                            'command': 'ec2',
                            'entity': 'images',
                            'result_path': 'Images',
                            'key_comparer': 'image_id',
                            'vars': []
                        }
                    ],
                    'security-list': [
                        {
                            'access': 'describe_security_groups',
                            'command': 'ec2',
                            'entity': 'networks',
                            'result_path': 'SecurityGroups',
                            'key_comparer': 'security_id',
                            'vars': [
                                {'name': 'MaxResults', 'env': 'MAESTRO_SCAN_QTD', 'default': 200, 'type': 'int'}
                            ]
                        }
                    ],
                    'network-list': [
                        {
                            'access': 'describe_vpcs',
                            'command': 'ec2',
                            'entity': 'networks',
                            'result_path': 'Vpcs',
                            'key_comparer': 'vpc_id',
                            'vars': []
                        },
                        {
                            'access': 'describe_subnets',
                            'command': 'ec2',
                            'entity': 'networks',
                            'result_path': 'Subnets',
                            'key_comparer': 'subnet_id',
                            'vars': []
                        },
                        {
                            'access': 'describe_vpc_peering_connections',
                            'command': 'ec2',
                            'entity': 'networks',
                            'result_path': 'VpcPeeringConnections',
                            'key_comparer': 'vpc_peering_connection_id',
                            'vars': []
                        },
                        {
                            'access': 'describe_vpn_gateways',
                            'command': 'ec2',
                            'entity': 'networks',
                            'result_path': 'VpnGateways',
                            'key_comparer': 'vpn_gateway_id',
                            'vars': []
                        },
                        {
                            'access': 'describe_vpc_endpoints',
                            'command': 'ec2',
                            'entity': 'networks',
                            'result_path': 'VpcEndpoints',
                            'key_comparer': 'vpc_endpoint_id',
                            'vars': [
                                {'name': 'MaxResults', 'env': 'MAESTRO_SCAN_QTD', 'default': 200, 'type': 'int'}
                            ]
                        },
                        {
                            'access': 'describe_route_tables',
                            'command': 'ec2',
                            'entity': 'networks',
                            'result_path': 'RouteTables',
                            'key_comparer': 'route_table_id',
                            'vars': []
                        },
                        {
                            'access': 'describe_network_interfaces',
                            'command': 'ec2',
                            'entity': 'networks',
                            'result_path': 'NetworkInterfaces',
                            'key_comparer': 'network_interface_id',
                            'vars': []
                        },
                        {
                            'access': 'describe_nat_gateways',
                            'command': 'ec2',
                            'entity': 'networks',
                            'result_path': 'NatGateways',
                            'key_comparer': 'natgateway_id',
                            'vars': [
                                {'name': 'MaxResults', 'env': 'MAESTRO_SCAN_QTD', 'default': 200, 'type': 'int'}
                            ]
                        },
                        {
                            'access': 'describe_network_acls',
                            'command': 'ec2',
                            'entity': 'networks',
                            'result_path': 'NetworkAcls',
                            'key_comparer': 'network_acl_id',
                            'vars': []
                        }
                    ],
                },


                'OpenStack': {
                    'server-list': [
                        {
                            'access': 'servers',
                            'command': 'compute',
                            'entity': 'servers',
                            'result_path': '',
                            'single_result_path': '',
                            'key_comparer': 'unique_id',
                            'vars': [
                                {'name': 'limit', 'env': 'MAESTRO_SCAN_QTD', 'default': 200, 'type': 'int'}
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
                            'key_comparer': 'unique_id',
                            'vars': [
                                {'name': 'limit', 'env': 'MAESTRO_SCAN_QTD', 'default': 200, 'type': 'int'}
                            ]
                        }
                    ],
                    'volumes-list': [
                        {
                            'access': 'volumes',
                            'command': 'block_store',
                            'entity': 'volumes',
                            'result_path': '',
                            'single_result_path': '',
                            'key_comparer': 'unique_id',
                            'vars': [
                                {'name': 'limit', 'env': 'MAESTRO_SCAN_QTD', 'default': 200, 'type': 'int'}
                            ]
                        }
                    ],
                    'snapshot-list': [
                        {
                            'access': 'snapshots',
                            'command': 'block_store',
                            'entity': 'snapshots',
                            'result_path': '',
                            'single_result_path': '',
                            'key_comparer': 'unique_id',
                            'vars': [
                                {'name': 'limit', 'env': 'MAESTRO_SCAN_QTD', 'default': 200, 'type': 'int'}
                            ]
                        }
                    ],
                    'images-list': [
                        {
                            'access': 'images',
                            'command': 'compute',
                            'entity': 'images',
                            'result_path': '',
                            'single_result_path': '',
                            'key_comparer': 'unique_id',
                            'vars': [
                                {'name': 'limit', 'env': 'MAESTRO_SCAN_QTD', 'default': 200, 'type': 'int'}
                            ]
                        }
                    ],
                    'security-list': [
                        {
                            'access': 'security_groups',
                            'command': 'network',
                            'entity': 'networks',
                            'result_path': '',
                            'single_result_path': '',
                            'key_comparer': 'unique_id',
                            'vars': [
                                {'name': 'limit', 'env': 'MAESTRO_SCAN_QTD', 'default': 200, 'type': 'int'}
                            ]
                        }
                    ],
                    'network-list': [
                        {
                            'access': 'networks',
                            'command': 'network',
                            'entity': 'networks',
                            'result_path': '',
                            'single_result_path': '',
                            'key_comparer': 'unique_id',
                            'vars': [
                                {'name': 'limit', 'env': 'MAESTRO_SCAN_QTD', 'default': 200, 'type': 'int'}
                            ]
                        },
                        {
                            'access': 'subnets',
                            'command': 'network',
                            'entity': 'networks',
                            'result_path': '',
                            'single_result_path': '',
                            'key_comparer': 'unique_id',
                            'vars': [
                                {'name': 'limit', 'env': 'MAESTRO_SCAN_QTD', 'default': 200, 'type': 'int'}
                            ]
                        },
                        {
                            'access': 'ports',
                            'command': 'network',
                            'entity': 'networks',
                            'result_path': '',
                            'single_result_path': '',
                            'key_comparer': 'unique_id',
                            'vars': [
                                {'name': 'limit', 'env': 'MAESTRO_SCAN_QTD', 'default': 200, 'type': 'int'}
                            ]
                        },
                        {
                            'access': 'routers',
                            'command': 'network',
                            'entity': 'networks',
                            'result_path': '',
                            'single_result_path': '',
                            'key_comparer': 'unique_id',
                            'vars': [
                                {'name': 'limit', 'env': 'MAESTRO_SCAN_QTD', 'default': 200, 'type': 'int'}
                            ]
                        }
                    ]
                }
            }
        },
        "key": "connections",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'connections'}, [], {}, {remove: true}, next);
};