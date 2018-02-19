'use strict';

const _ = require('lodash');

const Datacenters = require('../repositories/dao/datacenter');

const app = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name',
    'zones', 'regions', 'provider', 'role', 'metas', 'roles', 'servers_count', 'sucessed'];

    const singleFilled = [...resFilled, 'owner', 'auth'];

    const filled = [..._.slice(singleFilled, 2)]; // delete id

    return {
        name: "datacenters",

        access: 'roles',

        validators: require('../validators/datacenters'),

        dao: Datacenters,

        defaults: {servers_count: 0},

        mapRelations: [],

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = app();
