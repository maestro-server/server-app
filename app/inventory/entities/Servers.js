'use strict';

const _ = require('lodash');

const Servers = require('../repositories/dao/servers');

const servers = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'hostname', 'name',
        'ipv4_private', 'ipv4_public', 'os.base', 'os.dist',
        'datacenters.name', 'datacenters.region', 'datacenters.zone', 'datacenters._id', 'datacenters.instance_id',
        'applications._id', 'applications.name', 'applications.family', 'role', 'environment',
         'auth.name', 'auth.username', 'auth.type', 'services', 'tags'
    ];
    const singleFilled = [...resFilled, 'unique_id', 'cpu', 'memory', 'accountant',
        'storage', 'datacenters', 'applications', 'os', 'auth', 'role', 'environment',
        'image', 'backup_ids', 'next_backup_window', 'network_interface', 'service_mgr', 'pkg_mgr',
        'snapshot_ids', 'env_vars', 'dns', 'network_lo', 'ipv4_all', 'ipv6_all',
        'roles', 'owner', 'active', 'status', 'meta', 'checksum', 'metas', 'dns_public', 'dns_private'];

    const filled = [..._.slice(singleFilled, 3)]; // delete id, update and create at
    const hooks = [..._.slice(singleFilled, 1)]; // delete only id

    const name = 'servers';

    return {
        name,

        access: 'roles',

        validators: require('../validators/servers'),

        dao: Servers,

        defaults: {},

        mapRelations: ['applications', 'datacenters'],

        hooks: {
            after_create: {
                auditHookUpdated: {
                    entity: name,
                    fill: hooks
                }
            },
            before_update: {
                createEmptyChecksum: {
                    entity: name
                }
            },
            after_update: {
                auditHookUpdated: {
                    entity: name,
                    fill: hooks
                }
            },
            after_patch: {
                auditHookPatched: {
                    entity: name,
                    fill: filled
                }
            },
            after_delete: {
                auditHookDeleted: {
                    entity: name,
                    fill: filled
                }
            }
        },

        visibility: {single: 'all'},

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = servers();
