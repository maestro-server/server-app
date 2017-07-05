'use strict';

const _ = require('lodash');

const users = () => {
    const resFilled = ['_id', 'name', 'fullname', 'email'];

    const singleFilled = [...resFilled, 'phone', 'company', 'avatar', 'job', 'country', 'city', 'address'];

    const filled = [..._.tail(singleFilled), 'password']; // delete id

    return {
      name: "users",

      access: null,

      validators: require('../validators'),

      filled,
      singleFilled,
      resFilled
    };
};

module.exports = users();
