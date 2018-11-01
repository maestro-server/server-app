'use strict';

const _ = require('lodash');

const Datacenters = require('../repositories/dao/datacenter');

const app = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'active',
    'zones', 'regions', 'provider', 'role', 'metas', 'roles', 'sucessed'];

    const singleFilled = [...resFilled, 'owner', 'auth', 'tracker'];

    const filled = [..._.slice(singleFilled, 2)]; // delete id

    return {
        name: "datacenters",

        access: 'roles',

        validators: require('../validators/datacenters'),

        dao: Datacenters,

        defaults: {},

        mapRelations: [],

        visibility: {single: 'all'},

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = app();
