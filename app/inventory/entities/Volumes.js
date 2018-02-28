'use strict';

const _ = require('lodash');

const Volume = require('../repositories/dao/volumes');

const volume = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'size', 'unique_id',
        'encrypted', 'kms_key_id', 'iops', 'volume_id', 'attach_time', 'status', 'datacenters.name', 'tags'];

    const singleFilled = [...resFilled, 'datacenters', 'roles', 'owner', 'source_volume_id',
        'migration_id', 'image_id', 'volume_type', 'snapshot_id', 'project_id', 'service'];

    const filled = [..._.slice(singleFilled, 2)];  // delete id

    return {
        name: "volume",

        access: 'roles',

        validators: require('../validators/volumes'),

        dao: Volume,

        defaults: {},

        mapRelations: ['datacenters'],

        visibility: {single: 'all'},

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = volume();
