'use strict';

const _ = require('lodash');

const Images = require('../repositories/dao/images');

const images = () => {
    const resFilled = [
        '_id', 'updated_at', 'created_at', 'name', 'datacenters.name', 'datacenters.region', 'datacenters.zone',
        'image_id', 'image_type', 'image_location', 'status', 'active'
    ];

    const singleFilled = [...resFilled, 'unique_id', 'root_device_type', 'hypervisor', 'plataform', 'storage', 'roles', 'owner'];

    const filled = [..._.slice(singleFilled, 2)];  // delete id

    const name = 'images';

    return {
        name,

        access: 'roles',

        validators: require('../validators/images'),

        dao: Images,

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

module.exports = images();
