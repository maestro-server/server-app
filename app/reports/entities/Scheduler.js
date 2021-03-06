'use strict';

const _ = require('lodash');

const Schedulers = require('../repositories/dao/scheduler');

const scheduler = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name',
     'enabled',   'link', 'link._id', 'link.task', 'link.name', 'interval', 'cron', 'method', 'task', 'source',
        'args', 'kwargs', 'chain', 'endpoint', 'total_run_count', 'period_type', 'run_immediately', 'crawling'];

    const singleFilled = [...resFilled, 'msg', 'roles', 'owner', '_cls', 'active'];

    const filled = [..._.slice(singleFilled, 3)];  // delete id

    return {
        name: "scheduler",

        access: 'roles',

        validators: require('../validators/scheduler'),

        dao: Schedulers,

        mapRelations: ['link'],

        defaults: {},

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = scheduler();
