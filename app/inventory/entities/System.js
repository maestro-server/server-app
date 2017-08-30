'use strict';

const _ = require('lodash');

const System = require('../repositories/dao/system');

const system = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'description', 'check', 'tags', 'clients._id', 'clients.name'];

    const singleFilled = [...resFilled, 'clients', 'roles', 'owner'];

    const filled = [..._.slice(singleFilled, 3)];  // delete id

    return {
        name: "system",

        access: 'roles',

        validators: require('../validators/system'),

        dao: System,

        defaults: {},

        mapRelations: ['clients'],

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = system();
