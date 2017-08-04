'use strict';

const _ = require('lodash');

const Servers = require('../repositories/dao/db');

const servers = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'hostname', 'ipv4_private', 'ipv4_public', 'os.base', 'os.dist', 'dc.name', 'dc.zone', 'role', 'environment', 'auth.name', 'auth.username', 'auth.type', 'tags'];

    const singleFilled = [...resFilled, 'cpu', 'memory', 'storage', 'services', 'dc', 'os', 'auth', 'role', 'environment',
    'roles', 'owner', 'active', 'status'];

    const filled = [..._.slice(singleFilled, 3)]; // delete id

    return {
      name: "servers",

      access: 'roles',

      validators: require('../validators'),

      dao: Servers,

      filled,
      singleFilled,
      resFilled
    };
};

module.exports = servers();
