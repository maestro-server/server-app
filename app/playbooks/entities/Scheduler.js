'use strict';

const _ = require('lodash');

const Scheduler = require('../repositories/dao/scheduler');

const scheduler = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'description'];

    const singleFilled = [...resFilled, 'roles', 'owner'];

    const filled = [..._.slice(singleFilled, 3)];  // delete id

    return {
        name: "scheduler",

        access: 'roles',

        validators: require('../validators/scheduler'),

        dao: Scheduler,

        defaults: {},

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = scheduler();
