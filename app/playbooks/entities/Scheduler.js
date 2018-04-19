'use strict';

const _ = require('lodash');

const Scheduler = require('../repositories/dao/scheduler');

const scheduler = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name',
    'interval', 'crontab', 'enabled', 'args', 'kwargs', 'chain', 'endpoint', 'link', 'method',
    'total_run_count', 'max_execution', 'period_type', 'last_run_at'];

    const singleFilled = [...resFilled, 'roles', 'owner', '_cls'];

    const filled = [..._.slice(singleFilled, 2)];  // delete id

    return {
        name: "scheduler",

        access: 'roles',

        validators: require('../validators/scheduler'),

        dao: Scheduler,

        mapRelations: ['chain'],

        defaults: {},

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = scheduler();
