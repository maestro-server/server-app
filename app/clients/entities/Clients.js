'use strict';

module.exports = {
    name: "clients",

    access: 'members',

    validators: require('../validators'),

    filled: ['name', 'name', 'email', 'url', 'members', 'owner'],
    resFilled: ['_id', 'name', 'email', 'url', 'members', 'owner']
};
