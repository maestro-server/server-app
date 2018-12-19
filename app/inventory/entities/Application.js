'use strict';

const _ = require('lodash');

const Applications = require('../repositories/dao/applications');

const app = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'unique_id',
    'name', 'status', 'family', 'environment', 'provider', 'own',
    'system.name', 'system._id', 'engine', 'size', 'deps', 'role', 'spec', 'asm_groups',
    'language', 'cluster', 'dataguard', 'type', 'storage_types',
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

        mapRelations: ['system', 'deps'],

        visibility: {single: 'all'},

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

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = app();
