'use strict';

const _ = require('lodash');

const Datacenters = require('../repositories/dao/datacenter');

const app = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'active',
    'zones', 'regions', 'provider', 'role', 'metas', 'roles', 'sucessed'];

    const singleFilled = [...resFilled, 'owner', 'auth', 'tracker'];

    const filled = [..._.slice(singleFilled, 2)]; // delete id

    const name = 'datacenters';

    return {
        name,

        access: 'roles',

        validators: require('../validators/datacenters'),

        dao: Datacenters,

        defaults: {},

        mapRelations: [],

        visibility: {single: 'all'},

        hooks: {
            after_create: {
                auditHookUpdated: {
                    entity: name,
                    fill: filled
                }
            },
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
