'use strict';

const _ = require('lodash');

const Event = require('../repositories/dao/events');

const report = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'description'];

    const singleFilled = [...resFilled, 'roles', 'owner'];

    const filled = [..._.slice(singleFilled, 3)];  // delete id

    return {
        name: "events",

        access: 'roles',

        validators: require('../validators/events'),

        dao: Event,

        defaults: {},

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = report();
