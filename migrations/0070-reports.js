'use strict';

exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        'value': {
            tables: [
                {
                    name: 'Servers',
                    order: 1,
                    filters: [
                        {key: 'hostname', type: 'string'},
                        {key: 'ipv4_private', type: 'string'},
                        {key: 'ipv4_public', type: 'string'},
                        {key: 'role', type: 'string'},
                        {key: 'environment', type: 'select', opts: ['production', 'staging', 'development', 'uta', 'training', 'sandbox']},
                        {key: 'dns_public', type: 'string'},
                        {key: 'dns_private', type: 'string'},
                        {key: 'memory', type: 'number'},
                        {key: 'cpu', type: 'number'},
                        {key: 'os', type: 'object', leaf: ['base', 'dist', 'version']},
                        {key: 'storage', type: 'array', leaf:
                                {type: 'object', leaf: ['name', 'size', 'status']}
                                },
                        {key: 'auth', type: 'array', leaf:
                                {type: 'object', leaf: ['name', 'type']}
                                },
                        {key: 'services', type: 'array', leaf:
                                {type: 'object', leaf: ['name', 'version']}
                        },
                        {key: 'tags', type: 'array', leaf:
                                {type: 'object', leaf: ['key', 'value']}
                                },
                        {key: 'status', type: 'select', opts: ['active', 'avaliable', 'stopped']},
                        {key: 'metas', type: 'object', leaf: ['security_groups']},
                        {key: 'datacenters', type: 'object', leaf: ['name', 'provider', 'region', 'zone', 'type', 'instance', 'subnet_id', 'virtualization_type', 'hypervisor', 'root_device_type', 'architecture', 'cloudwatch_monitoring']},
                        {key: 'owner', type: 'object', leaf: ['name', 'refs']},
                        {key: 'roles', type: 'array', leaf:
                                {type: 'object', leaf: ['name', 'refs']}},
                        {key: 'created_at', type: 'date'},
                        {key: 'updated_at', type: 'date'},
                        {key: 'active', type: 'boolean'}
                    ]
                },
                {
                    name: 'Applications',
                    order: 2,
                    filters: [
                        {key: 'name', type: 'string'},
                        {key: 'family', type: 'select', opts: ['Application', 'Loadbalance', 'Broker', 'Database', 'Serverless', 'ApiGateway', 'ContainerOrchestration', 'ServiceMesh', 'Cache', 'CDN', 'Object Storage', 'Monitoring', 'Logs', 'SMTP', 'ServiceDiscovery', 'VPN', 'Repository', 'DNS', 'CI/CD', 'Auth', 'NAS', 'AutoScaling', 'AutoScalingPlan', 'ETL'],},
                        {key: 'environment', type: 'select', opts: ['production', 'staging', 'development', 'uta', 'training', 'sandbox']},
                        {key: 'language', type: 'string'},
                        {key: 'provider', type: 'string'},
                        {key: 'cluster', type: 'number'},
                        {key: 'dataguard', type: 'number'},
                        {key: 'storage_types', type: 'string'},
                        {key: 'asm_groups', type: 'array', leaf:
                                {type: 'string'}},
                        {key: 'pdbs', type: 'array', leaf:
                                {type: 'string'}},
                        {key: 'crs_version', type: 'number'},
                        {key: 'type', type: 'number'},
                        {key: 'role', type: 'object', leaf: ['role', 'endpoint', 'path', 'command']},
                        {key: 'deploy', type: 'array', leaf:
                                {type: 'object', leaf: ['type', 'provider']}},
                        {key: 'system', type: 'array', leaf:
                                {type: 'object', leaf: ['name']}},
                        {key: 'servers', type: 'array', leaf:
                                {type: 'string'}},
                        {key: 'targets', type: 'array', leaf:
                                {type: 'string'}},
                        {key: 'datacenters', type: 'object', leaf: ['name', 'provider', 'region', 'zone', 'type', 'instance', 'subnet_id', 'virtualization_type', 'hypervisor', 'root_device_type', 'architecture', 'cloudwatch_monitoring']},
                        {key: 'owner', type: 'object', leaf: ['name', 'refs']},
                        {key: 'tags', type: 'array', leaf:
                                {type: 'object', leaf: ['key', 'value']}
                        },
                        {key: 'roles', type: 'array', leaf:
                                {type: 'object', leaf: ['name', 'refs']}},
                        {key: 'created_at', type: 'date'},
                        {key: 'updated_at', type: 'date'},
                        {key: 'active', type: 'boolean'}
                    ]
                },
                {
                    name: 'Systems',
                    order: 3,
                    filters: [
                        {key: 'name', type: 'string'},
                        {key: 'clients', type: 'array', leaf:
                                {type: 'object', leaf: ['name']}},
                        {key: 'check', type: 'array', leaf:
                                {type: 'object', leaf: ['type', 'endpoint']}},
                        {key: 'owner', type: 'object', leaf: ['name', 'refs']},
                        {key: 'tags', type: 'array', leaf:
                                {type: 'object', leaf: ['key', 'value']}
                        },
                        {key: 'roles', type: 'array', leaf:
                                {type: 'object', leaf: ['name', 'refs']}},
                        {key: 'created_at', type: 'date'},
                        {key: 'updated_at', type: 'date'},
                        {key: 'active', type: 'boolean'}
                    ]
                },
                {
                    name: 'Clients',
                    order: 4,
                    filters: [
                        {key: 'name', type: 'string'},
                        {key: 'contacts', type: 'array', leaf:
                                {type: 'object', leaf: ['channel', 'value']}},
                        {key: 'owner', type: 'object', leaf: ['name', 'refs']},
                        {key: 'tags', type: 'array', leaf:
                                {type: 'object', leaf: ['key', 'value']}
                        },
                        {key: 'roles', type: 'array', leaf:
                                {type: 'object', leaf: ['name', 'refs']}},
                        {key: 'created_at', type: 'date'},
                        {key: 'updated_at', type: 'date'},
                        {key: 'active', type: 'boolean'}
                    ]
                },
                {
                    name: 'Datacenters',
                    order: 5,
                    filters: [
                        {key: 'name', type: 'string'},
                        {key: 'provider', type: 'string'},
                        {key: 'zones', type: 'array', leaf:
                                {type: 'string'}},
                        {key: 'regions', type: 'array', leaf:
                                {type: 'string'}},
                        {key: 'owner', type: 'object', leaf: ['name', 'refs']},
                        {key: 'tags', type: 'array', leaf:
                                {type: 'object', leaf: ['key', 'value']}
                        },
                        {key: 'roles', type: 'array', leaf:
                                {type: 'object', leaf: ['name', 'refs']}},
                        {key: 'created_at', type: 'date'},
                        {key: 'updated_at', type: 'date'},
                        {key: 'active', type: 'boolean'}
                    ]
                },
                {
                    name: 'Teams',
                    order: 6,
                    filters: [
                        {key: 'name', type: 'string'},
                        {key: 'email', type: 'string'},
                        {key: 'owner', type: 'object', leaf: ['name', 'refs']},
                        {key: 'tags', type: 'array', leaf:
                                {type: 'object', leaf: ['key', 'value']}
                        },
                        {key: 'members', type: 'array', leaf:
                                {type: 'object', leaf: ['name', 'refs']}},
                        {key: 'created_at', type: 'date'},
                        {key: 'updated_at', type: 'date'},
                        {key: 'active', type: 'boolean'}
                    ]
                },
                {
                    name: 'Connections',
                    order: 7,
                    filters: [
                        {key: 'name', type: 'string'},
                        {key: 'dc', type: 'string'},
                        {key: 'status', type: 'string'},
                        {key: 'regions', type: 'array', leaf:
                                {type: 'string'}},
                        {key: 'owner', type: 'object', leaf: ['name', 'refs']},
                        {key: 'tags', type: 'array', leaf:
                                {type: 'object', leaf: ['key', 'value']}
                        },
                        {key: 'roles', type: 'array', leaf:
                                {type: 'object', leaf: ['name', 'refs']}},
                        {key: 'created_at', type: 'date'},
                        {key: 'updated_at', type: 'date'},
                        {key: 'active', type: 'boolean'}
                    ]
                },
                {
                    name: 'Events',
                    order: 8,
                    filters: [
                        {key: 'name', type: 'string'},
                        {key: 'owner', type: 'object', leaf: ['name', 'refs']},
                        {key: 'tags', type: 'array', leaf:
                                {type: 'object', leaf: ['key', 'value']}
                        },
                        {key: 'roles', type: 'array', leaf:
                                {type: 'object', leaf: ['name', 'refs']}},
                        {key: 'created_at', type: 'date'},
                        {key: 'updated_at', type: 'date'},
                        {key: 'active', type: 'boolean'}
                    ]
                },
                {
                    name: 'Flavors',
                    order: 9,
                    filters: [
                        {key: 'name', type: 'string'},
                        {key: 'unique_id', type: 'string'},
                        {key: 'memory', type: 'string'},
                        {key: 'disk', type: 'string'},
                        {key: 'datacenters', type: 'object', leaf: ['name', 'provider', 'region', 'zone']},
                        {key: 'tags', type: 'array', leaf:
                                {type: 'object', leaf: ['key', 'value']}
                        },
                        {key: 'created_at', type: 'date'},
                        {key: 'updated_at', type: 'date'},
                        {key: 'active', type: 'boolean'}
                    ]
                },
                {
                    name: 'Images',
                    order: 10,
                    filters: [
                        {key: 'name', type: 'string'},
                        {key: 'unique_id', type: 'string'},
                        {key: 'datacenters', type: 'object', leaf: ['name', 'provider', 'region', 'zone']},
                        {key: 'image_type', type: 'string'},
                        {key: 'owner', type: 'object', leaf: ['name', 'refs']},
                        {key: 'tags', type: 'array', leaf:
                                {type: 'object', leaf: ['key', 'value']}
                        },
                        {key: 'roles', type: 'array', leaf:
                                {type: 'object', leaf: ['name', 'refs']}},
                        {key: 'created_at', type: 'date'},
                        {key: 'updated_at', type: 'date'},
                        {key: 'active', type: 'boolean'}
                    ]
                },
                {
                    name: 'Networks',
                    order: 11,
                    filters: [
                        {key: 'name', type: 'string'},
                        {key: 'unique_id', type: 'string'},
                        {key: 'family', type: 'string'},
                        {key: 'group_name', type: 'string'},
                        {key: 'ip_permission', type: 'array', leaf: {
                            type: 'object', leaf: ['FromPort', 'IpProtocol']
                            }},
                        {key: 'datacenters', type: 'object', leaf: ['name', 'provider', 'region', 'zone']},
                        {key: 'owner', type: 'object', leaf: ['name', 'refs']},
                        {key: 'tags', type: 'array', leaf:
                                {type: 'object', leaf: ['key', 'value']}
                        },
                        {key: 'roles', type: 'array', leaf:
                                {type: 'object', leaf: ['name', 'refs']}},
                        {key: 'created_at', type: 'date'},
                        {key: 'updated_at', type: 'date'},
                        {key: 'active', type: 'boolean'}
                    ]
                },
                {
                    name: 'Projects',
                    order: 12,
                    filters: [
                        {key: 'name', type: 'string'},
                        {key: 'owner', type: 'object', leaf: ['name', 'refs']},
                        {key: 'tags', type: 'array', leaf:
                                {type: 'object', leaf: ['key', 'value']}
                        },
                        {key: 'roles', type: 'array', leaf:
                                {type: 'object', leaf: ['name', 'refs']}},
                        {key: 'created_at', type: 'date'},
                        {key: 'updated_at', type: 'date'},
                        {key: 'active', type: 'boolean'}
                    ]
                },
                {
                    name: 'Snapshots',
                    order: 14,
                    filters: [
                        {key: 'name', type: 'string'},
                        {key: 'unique_id', type: 'string'},
                        {key: 'encrypted', type: 'string'},
                        {key: 'status', type: 'string'},
                        {key: 'volume_size', type: 'string'},
                        {key: 'volume_id', type: 'string'},
                        {key: 'datacenters', type: 'object', leaf: ['name', 'provider', 'region', 'zone']},
                        {key: 'owner', type: 'object', leaf: ['name', 'refs']},
                        {key: 'tags', type: 'array', leaf:
                                {type: 'object', leaf: ['key', 'value']}
                        },
                        {key: 'roles', type: 'array', leaf:
                                {type: 'object', leaf: ['name', 'refs']}},
                        {key: 'created_at', type: 'date'},
                        {key: 'updated_at', type: 'date'},
                        {key: 'active', type: 'boolean'}
                    ]
                },
                {
                    name: 'Volumes',
                    order: 15,
                    filters: [
                        {key: 'name', type: 'string'},
                        {key: 'availability_zone', type: 'string'},
                        {key: 'encrypted', type: 'string'},
                        {key: 'size', type: 'string'},
                        {key: 'snapshot_id', type: 'string'},
                        {key: 'iops', type: 'string'},
                        {key: 'status', type: 'string'},

                        {key: 'datacenters', type: 'object', leaf: ['name', 'provider', 'region', 'zone']},
                        {key: 'owner', type: 'object', leaf: ['name', 'refs']},
                        {key: 'tags', type: 'array', leaf:
                                {type: 'object', leaf: ['key', 'value']}
                        },
                        {key: 'roles', type: 'array', leaf:
                                {type: 'object', leaf: ['name', 'refs']}},
                        {key: 'created_at', type: 'date'},
                        {key: 'updated_at', type: 'date'},
                        {key: 'active', type: 'boolean'}
                    ]
                }]
        },
        'key': 'reports_options',
        'active': true,
        'updated_at': new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'reports_options'}, [], {}, {remove: true}, next);
};
