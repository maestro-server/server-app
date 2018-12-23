'use strict';

const _ = require('lodash');

const Teams = require('../repositories/dao/teams');

const teams = () => {
    const resFilled = ['_id', 'updated_at', 'name', 'email', 'url', 'avatar', 'members', 'owner'];

    const singleFilled = [...resFilled];

    const filled = [..._.slice(singleFilled, 2)]; // delete id

    const name = "teams";

    return {
        name,

        access: 'members',

        validators: require('../validators/teams'),

        dao: Teams,

        hooks: {
            after_update: {
                auditHookUpdated: {
                    entity: name,
                    fill: ['name', 'email']
                }
            },
            after_patch: {
                auditHookPatched: {
                    entity: name,
                    fill: ['name', 'email']
                }
            },
            after_delete: {
                auditHookDeleted: {
                    entity: name,
                    fill: ['name', 'email']
                }
            }
        },

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = teams();
