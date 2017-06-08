'use strict';

module.exports = {
    name: "architectures",

    access: 'roles',

    validators: require('../validators'),

    filled: ['name', 'roles', 'owner'],
    resFilled: ['_id', 'name', 'roles', 'owner']
}
