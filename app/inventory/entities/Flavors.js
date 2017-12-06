'use strict';

const _ = require('lodash');

const Flavors = require('../repositories/dao/flavors');

const volume = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'datacenters', 'tags'];

    const singleFilled = [...resFilled, 'roles', 'owner'];

    const filled = [..._.slice(singleFilled, 3)];  // delete id

    return {
        name: "flavors",

        access: 'roles',

        validators: require('../validators/flavors'),

        dao: Flavors,

        defaults: {},

        mapRelations: [],

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = volume();
