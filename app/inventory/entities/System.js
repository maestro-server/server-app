'use strict';

const _ = require('lodash');

const System = require('../repositories/dao/system');

const system = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'description', 'entry', 'tags', 'clients._id', 'clients.name'];

    const singleFilled = [...resFilled, 'clients', 'roles', 'owner'];

    const filled = [..._.slice(singleFilled, 2)];  // delete id

    return {
        name: "system",

        access: 'roles',

        validators: require('../validators/system'),

        dao: System,

        defaults: {},

        mapRelations: ['clients', 'entry'],

        visibility: {single: 'all'},

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = system();
