'use strict';

module.exports = {
    name: "users",

    access: null,

    validators: require('../validators'),

    filled: ['name', 'fullname', 'email', 'password', 'phone', 'company', 'avatar', 'job', 'country', 'city', 'address'],
    resFilled: ['_id', 'name', 'fullname', 'email'  , 'phone', 'company', 'avatar', 'job', 'country', 'city', 'address']
};
