'use strict';

const _ = require('lodash');

const Images = require('../repositories/dao/images');

const images = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'datacenters', 'image_id', 'image_type', 'image_location', 'status'];

    const singleFilled = [...resFilled, 'unique_id', 'root_device_type', 'hypervisor', 'plataform', 'storage', 'roles', 'owner'];

    const filled = [..._.slice(singleFilled, 3)];  // delete id

    return {
        name: "images",

        access: 'roles',

        validators: require('../validators/images'),

        dao: Images,

        defaults: {},

        mapRelations: [],

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = images();
