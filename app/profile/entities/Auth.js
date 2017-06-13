'use strict';

module.exports = {
    name: "users",

    access: null,

    validators: require('../validators'),

    filled: ['name', 'email', 'password'],
    resFilled: ['_id', 'name', 'email', 'password']
};
