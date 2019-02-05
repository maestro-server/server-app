'use strict';

const _ = require('lodash');

const Images = require('../repositories/dao/images');

const images = () => {
    const resFilled = [
        '_id', 'updated_at', 'created_at', 'name', 'datacenters.name', 'datacenters.region', 'datacenters.zone',
        'size', 'unique_id', 'image_type', 'image_location', 'status', 'active'
    ];

    const singleFilled = [...resFilled, 'root_device_type', 'hypervisor', 'plataform', 'storage', 'roles', 'owner', 'distribution', 'slug', 'region', 'public', 'min_disk_size', 'type'];

    const filled = [..._.slice(singleFilled, 2)];  // delete id

    const name = 'images';

    return {
        name,

        access: 'roles',

        validators: require('../validators/images'),

        dao: Images,

        defaults: {},

        mapRelations: ['datacenters'],

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

module.exports = images();
