'use strict';

const _ = require('lodash');

const System = require('../repositories/dao/system');

const system = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'description', 'entry', 'tags', 'clients._id', 'clients.name'];

    const singleFilled = [...resFilled, 'clients', 'roles', 'owner', 'active'];

    const filled = [..._.slice(singleFilled, 2)];  // delete id

    const name = 'system';

    return {
        name,

        access: 'roles',

        validators: require('../validators/system'),

        dao: System,

        defaults: {},

        mapRelations: ['clients', 'entry'],

        visibility: {single: 'all'},

        hooks: {
            after_create: {
                auditHookUpdated: {
                    entity: name,
                    fill: filled
                }
            },
            before_create: {
                systemHookEntryApp: {}
            },
            after_update: {
                auditHookUpdated: {
                    entity: name,
                    fill: filled
                }
            },
            before_update: {
                systemHookEntryApp: {}
            },
            after_patch: {
                auditHookPatched: {
                    entity: name,
                    fill: filled
                },
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

module.exports = system();
