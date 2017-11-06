'use strict';

const _ = require('lodash');

const Provider = require('../repositories/dao/provider');

const provider = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'conn', 'roles', 'dc', 'regions', 'provider'];

    const singleFilled = [...resFilled, 'process', 'owner'];

    const filled = [..._.slice(singleFilled, 3)];  // delete id

    return {
        name: "providers",

        access: 'roles',

        validators: require('../validators/providers'),

        dao: Provider,

        defaults: {},

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = provider();
