'use strict';

const _ = require('lodash');

const Servers = require('../repositories/dao/servers');

const servers = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'hostname',
        'ipv4_private', 'ipv4_public', 'os.base', 'os.dist',
        'datacenters.name', 'datacenters.region', 'datacenters.zone', 'datacenters._id', 'datacenters.instance_id',
        'role', 'environment', 'auth.name', 'auth.username', 'auth.type', 'services', 'tags'];

    const singleFilled = [...resFilled, 'unique_id', 'cpu', 'memory', 'storage', 'datacenters', 'os', 'auth', 'role', 'environment',
        'roles', 'owner', 'active', 'status', 'meta'];

    const filled = [..._.slice(singleFilled, 2)]; // delete id

    return {
        name: "servers",

        access: 'roles',

        validators: require('../validators/servers'),

        dao: Servers,

        defaults: {},

        mapRelations: ['datacenters'],

        hooks: {},

        visibility: {single: 'all'},

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = servers();
