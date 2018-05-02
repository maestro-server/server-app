'use strict';

const _ = require('lodash');

const Scheduler = require('../repositories/dao/scheduler');

const scheduler = () => {
    const resFilled = ['_id', 'updated_at', 'last_run_at', 'created_at', 'name',
     'enabled',   'link', 'link._id', 'link.task', 'link.name', 'interval', 'crontab', 'method', 'task',
        'args', 'kwargs', 'chain', 'endpoint', 'total_run_count', 'max_run_count', 'period_type'];

    const singleFilled = [...resFilled, 'msg', 'roles', 'owner', '_cls'];

    const filled = [..._.slice(singleFilled, 3)];  // delete id

    return {
        name: "scheduler",

        access: 'roles',

        validators: require('../validators/scheduler'),

        dao: Scheduler,

        mapRelations: ['link'],

        defaults: {},

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = scheduler();
