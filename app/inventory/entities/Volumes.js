'use strict';

const _ = require('lodash');

const Volume = require('../repositories/dao/volumes');

const volume = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'size',
        'encrypted', 'kms_key_id', 'iops', 'volume_id', 'attach_time', 'state', 'datacenters', 'tags'];

    const singleFilled = [...resFilled, 'clients', 'roles', 'owner'];

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
