'use strict';

const _ = require('lodash');

const AccessManager = require('../repositories/dao/access_manager');

const access_manager = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'description'];

    const singleFilled = [...resFilled, 'roles', 'owner'];

    const filled = [..._.slice(singleFilled, 2)];  // delete id

    return {
        name: "access_manager",

        access: 'roles',

        validators: require('../validators/access_manager'),

        dao: AccessManager,

        defaults: {},

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = access_manager();
