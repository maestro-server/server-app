'use strict';

const _ = require('lodash');

const Playbook = require('../repositories/dao/playbook');

const playbook = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'description'];

    const singleFilled = [...resFilled, 'roles', 'owner'];

    const filled = [..._.slice(singleFilled, 3)];  // delete id

    return {
        name: "playbooks",

        access: 'roles',

        validators: require('../validators/playbooks'),

        dao: Playbook,

        defaults: {},

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = playbook();
