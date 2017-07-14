'use strict';

const _ = require('lodash');

const app = () => {
    const resFilled = ['_id', 'name', 'zones', 'provider', 'role'];

    const singleFilled = [...resFilled, 'roles', 'owner'];

    const filled = [..._.tail(singleFilled)]; // delete id

    return {
      name: "datacenters",

      access: 'roles',

      validators: require('../validators'),

      filled,
      singleFilled,
      resFilled
    };
};

module.exports = app();
