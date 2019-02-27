'use strict';

const _ = require('lodash');

const Volume = require('../repositories/dao/volumes');

const volume = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'size', 'unique_id',
        'iops', 'datacenters.name', 'datacenters', 'encrypted', 'attach_time', 'status', 'fftype', 'tags'];

    const singleFilled = [...resFilled, 'kms_key_id', 'roles', 'owner', 'source_volume_id', 'active',
        'storage_account_type', 'write_accelerator_enabled', 'vhd', 'diff_disk_settings', 'create_option',
        'migration_id', 'image_id', 'volume_type', 'snapshot_id', 'project_id', 'service', 'droplets_ids'];

    const filled = [..._.slice(singleFilled, 2)];  // delete id

    const name = 'volume';

    return {
        name,

        access: 'roles',

        validators: require('../validators/volumes'),

        dao: Volume,

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

module.exports = volume();
