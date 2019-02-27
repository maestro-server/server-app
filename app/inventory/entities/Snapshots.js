'use strict';

const _ = require('lodash');

const Snapshots = require('../repositories/dao/snapshots');

const snapshots = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'datacenters.name', 'datacenters.region', 'datacenters.zone', 'volume_id', 'volume_size',
        'status', 'snapshot_id', 'size', 'progress', 'active'];

    const singleFilled = [...resFilled, 'datacenters',  'unique_id', 'kms_key_id', 'encrypted', 'description', 'project_id', 'service',
        'data_encryption_key_id', 'owner_id', 'start_time', 'owner_alias', 'state_message', 'roles', 'min_disk_size', 'public', 'type'];

    const filled = [..._.slice(singleFilled, 2)];  // delete id

    const name = 'snapshots';

    return {
        name,

        access: 'roles',

        validators: require('../validators/snapshots'),

        dao: Snapshots,

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

module.exports = snapshots();
