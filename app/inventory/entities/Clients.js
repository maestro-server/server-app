'use strict';

const _ = require('lodash');

const Clients = require('../repositories/dao/clients');

const clients = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'description', 'contacts', 'tags', 'active'];

    const singleFilled = [...resFilled, 'roles', 'owner'];

    const filled = [..._.slice(singleFilled, 2)]; // delete id

    const name = 'clients';

    return {
        name,

        access: 'roles',

        validators: require('../validators/clients'),

        dao: Clients,

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

module.exports = clients();
