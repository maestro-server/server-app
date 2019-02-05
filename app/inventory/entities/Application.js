'use strict';

const _ = require('lodash');

const Applications = require('../repositories/dao/applications');

const app = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'unique_id',
    'name', 'status', 'family', 'environment', 'provider', 'own', 'tables',
    'system.name', 'system._id', 'engine', 'size', 'deps', 'role', 'spec', 'asm_groups', 'domain', 'loadbalance_names', 'instances',
    'language', 'cluster', 'dataguard', 'type', 'storage_types', 'queues', 'urls', 'cache_behavior', 'cache_nodes',
    'crs_version', 'modal', 'pdbs', 'datacenters.name', 'datacenters',
    'deploy', 'tags', 'description', 'read_status', 'state', 'active'];

    const singleFilled = [...resFilled, 'roles', 'system', 'owner'];

    const filled = [..._.slice(singleFilled, 2)]; // delete id

    const name = 'applications';

    return {
        name,

        access: 'roles',

        validators: require('../validators/applications'),

        dao: Applications,

        defaults: {family: 'Application'},

        mapRelations: ['datacenters', 'system', 'deps'],

        visibility: {single: 'all'},

        hooks: {
            after_create: {
                auditHookUpdated: {
                    entity: name,
                    fill: filled
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
                    fill: filled
                }
            },
            before_patch: {
                createEmptyChecksum: {
                    entity: name
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

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = app();
