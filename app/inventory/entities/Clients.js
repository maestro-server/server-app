'use strict';

const _ = require('lodash');

const Clients = require('../repositories/dao/clients');

const clients = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'description', 'contacts', 'tags', 'active'];

    const singleFilled = [...resFilled, 'roles', 'owner'];

    const filled = [..._.slice(singleFilled, 2)]; // delete id

    return {
        name: "clients",

        access: 'roles',

        validators: require('../validators/clients'),

        dao: Clients,

        defaults: {},

        mapRelations: [],

        visibility: {single: 'all'},

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = clients();
