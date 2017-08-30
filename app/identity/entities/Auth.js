'use strict';

const _ = require('lodash');

const Users = require('../repositories/dao/users');

const auth = () => {
    const resFilled = ['_id', 'name',  'email', 'password'];

    const singleFilled = [...resFilled];

    const filled = [..._.tail(singleFilled), 'newpass']; // delete id

    return {
      name: "users",

      access: null,

      validators: require('../validators/auth'),

      dao: Users,

      filled,
      singleFilled,
      resFilled
    };
};

module.exports = auth();
