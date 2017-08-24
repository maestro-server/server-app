'use strict';

const _ = require('lodash');

const Servers = require('../repositories/dao/servers');

const servers = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'hostname', 'ipv4_private', 'ipv4_public', 'os.base', 'os.dist', 'dc.name', 'dc.region', 'dc.zone', 'role', 'environment', 'auth.name', 'auth.username', 'auth.type', 'tags'];

    const singleFilled = [...resFilled, 'cpu', 'memory', 'storage', 'services', 'dc', 'os', 'auth', 'role', 'environment',
        'roles', 'owner', 'active', 'status'];

    const filled = [..._.slice(singleFilled, 3)]; // delete id

    return {
        name: "servers",

        access: 'roles',

        validators: require('../validators/servers'),

        dao: Servers,

        defaults: {},

        mapRelations: [],

        hooks: {
          after_create: {
            relationInc: {
              Entity: require('inventory/entities/Datacenter'),
              field: 'servers_count',
              source: 'dc._id'
            }
          }
        },

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = servers();
