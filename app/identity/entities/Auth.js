'use strict';

const _ = require('lodash');

const Users = require('../repositories/dao/users');

const auth = () => {
    const resFilled = ['_id', 'name',  'email', 'avatar'];

    const singleFilled = [...resFilled, 'password'];

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
