'use strict';

const _ = require('lodash');

const servers = () => {
    const resFilled = ['_id', 'hostname', 'os', 'ipv4_private', 'ipv4_public', 'updated_at', 'created_at'];

    const singleFilled = ['cpu', 'memory', 'storage', 'services', 'dc', 'auth', 'meta',
    'roles', 'owner', ...resFilled];

    const filled = [..._.tail(singleFilled)]; // delete id

    return {
      name: "servers",

      access: 'roles',

      validators: require('../validators'),

      filled,
      singleFilled,
      resFilled
    };
};

module.exports = servers();
