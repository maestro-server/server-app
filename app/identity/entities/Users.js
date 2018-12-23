'use strict';

const _ = require('lodash');

const Users = require('../repositories/dao/users');

const users = () => {
    const resFilled = ['_id', 'name', 'fullname', 'email', 'avatar'];

    const singleFilled = [...resFilled, 'phone', 'company', 'job', 'country', 'city', 'address'];

    const filled = [..._.tail(singleFilled), 'password']; // delete id

    const name = "users";

    return {
        name,

        access: null,

        validators: require('../validators/users'),

        dao: Users,

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

module.exports = users();
