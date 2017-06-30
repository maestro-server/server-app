'use strict';

module.exports = {
    name: "admin",

    access: 'roles',

    validators: require('../validators'),

    filled: ['name', 'roles', 'owner'],
    resFilled: ['_id', 'name', 'roles', 'owner']
};
