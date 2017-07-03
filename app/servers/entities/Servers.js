'use strict';

const fill = ['name', 'roles', 'owner',
'hostname', 'ipv4_private', 'ipv4_public',
'os', 'cpu', 'memory', 'storage', 'services',
'dc', 'auth', 'meta'];

module.exports = {
    name: "servers",

    access: 'roles',

    validators: require('../validators'),

    filled: fill,
    resFilled: ['_id', ...fill]
};
