'use strict';

const _ = require('lodash');

const Snapshots = require('../repositories/dao/snapshots');

const snapshots = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'datacenters.name', 'volume_id', 'volume_size',
        'status', 'snapshot_id', 'progress'];

    const singleFilled = [...resFilled, 'datacenters',  'unique_id', 'kms_key_id', 'encrypted', 'description', 'project_id', 'service',
        'data_encryption_key_id', 'owner_id', 'start_time', 'owner_alias', 'state_message', 'roles'];

    const filled = [..._.slice(singleFilled, 2)];  // delete id

    return {
        name: "snapshots",

        access: 'roles',

        validators: require('../validators/snapshots'),

        dao: Snapshots,

        defaults: {},

        mapRelations: [],

        visibility: {single: 'all'},

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = snapshots();
