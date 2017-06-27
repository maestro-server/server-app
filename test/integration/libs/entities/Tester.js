'use strict';

module.exports = {
    name: "tester",

    access: 'roles',

    validators: require('../validators'),

    filled: ['name', 'roles', 'owner'],
    resFilled: ['_id', 'name', 'roles', 'owner']
};
