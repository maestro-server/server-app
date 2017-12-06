'use strict';

const _ = require('lodash');

const Volume = require('../repositories/dao/volumes');

const volume = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'size',
        'encrypted', 'kms_key_id', 'iops', 'volume_id', 'attach_time', 'status', 'datacenters', 'tags'];

    const singleFilled = [...resFilled, 'unique_id', 'roles', 'owner', 'source_volume_id',
        'migration_id', 'image_id', 'volume_type', 'snapshot_id', 'project_id', 'service'];

    const filled = [..._.slice(singleFilled, 3)];  // delete id

    return {
        name: "volume",

        access: 'roles',

        validators: require('../validators/volumes'),

        dao: Volume,

        defaults: {},

        mapRelations: [],

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = volume();
