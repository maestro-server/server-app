'use strict';

module.exports = {
    name: "users",

    access: null,

    validators: require('../validators/auth'),

    filled: ['name', 'email', 'newpass', 'password'],
    resFilled: ['_id', 'name', 'email', 'password']
};
