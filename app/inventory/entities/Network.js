'use strict';

const _ = require('lodash');

const Network = require('../repositories/dao/network');

const network = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'tags', 'family'];

    const singleFilled = [...resFilled, 'clients', 'roles', 'owner'];

    const filled = [..._.slice(singleFilled, 3)];  // delete id

    return {
        name: "network",

        access: 'roles',

        validators: require('../validators/network'),

        dao: Network,

        defaults: {},

        mapRelations: [],

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = network();
