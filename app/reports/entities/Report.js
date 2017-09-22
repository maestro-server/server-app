'use strict';

const _ = require('lodash');

const Report = require('../repositories/dao/report');

const report = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'description'];

    const singleFilled = [...resFilled, 'roles', 'owner'];

    const filled = [..._.slice(singleFilled, 3)];  // delete id

    return {
        name: "reports",

        access: 'roles',

        validators: require('../validators/reports'),

        dao: Report,

        defaults: {},

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = report();