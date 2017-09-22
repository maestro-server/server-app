'use strict';

const _ = require('lodash');

const Jobs = require('../repositories/dao/jobs');

const jobs = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'description'];

    const singleFilled = [...resFilled, 'roles', 'owner'];

    const filled = [..._.slice(singleFilled, 3)];  // delete id

    return {
        name: "jobs",

        access: 'roles',

        validators: require('../validators/jobs'),

        dao: Jobs,

        defaults: {},

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = jobs();
