'use strict';

const _ = require('lodash');

const TaskTemplate = require('../repositories/dao/task_template');

const task_template = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'description'];

    const singleFilled = [...resFilled, 'roles', 'owner'];

    const filled = [..._.slice(singleFilled, 2)];  // delete id

    return {
        name: "task_template",

        access: 'roles',

        validators: require('../validators/task_template'),

        dao: TaskTemplate,

        defaults: {},

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = task_template();
