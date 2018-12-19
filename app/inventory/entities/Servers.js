'use strict';

const _ = require('lodash');

const Servers = require('../repositories/dao/servers');

const servers = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'hostname',
        'ipv4_private', 'ipv4_public', 'os.base', 'os.dist',
        'datacenters.name', 'datacenters.region', 'datacenters.zone', 'datacenters._id', 'datacenters.instance_id',
        'applications._id', 'applications.name', 'applications.family',
        'role', 'environment', 'auth.name', 'auth.username', 'auth.type', 'services', 'tags'];

    const singleFilled = [...resFilled, 'unique_id', 'cpu', 'memory', 'storage', 'datacenters', 'applications', 'os', 'auth', 'role', 'environment',
        'roles', 'owner', 'active', 'status', 'meta'];

    const filled = [..._.slice(singleFilled, 2)]; // delete id

    const name = 'servers';

    return {
        name,

        access: 'roles',

        validators: require('../validators/servers'),

        dao: Servers,

        defaults: {},

        mapRelations: ['applications', 'datacenters'],

        hooks: {
            after_update: {
                auditHookUpdated: {
                    entity: name,
                    fill: filled
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
