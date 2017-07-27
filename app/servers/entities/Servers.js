'use strict';

const _ = require('lodash');

const Servers = require('../repositories/dao/db');

const servers = () => {
    const resFilled = ['_id', 'hostname', 'ipv4_private', 'ipv4_public', 'os.base', 'os.dist', 'dc.name', 'dc.zone', 'role', 'environment', 'auth.name', 'auth.admin', 'updated_at', 'created_at'];

    const singleFilled = ['cpu', 'memory', 'storage', 'services', 'dc', 'os', 'auth', 'role', 'environment', 'meta',
    'roles', 'owner', ...resFilled];

    const filled = [..._.tail(singleFilled)]; // delete id

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
