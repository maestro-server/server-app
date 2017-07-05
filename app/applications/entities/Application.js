'use strict';

const _ = require('lodash');

const app = () => {
    const resFilled = ['_id', 'name', 'system', 'servers', 'role'];

    const singleFilled = [...resFilled, 'description', 'meta', 'roles', 'owner'];

    const filled = [..._.tail(singleFilled)]; // delete id

    return {
      name: "applications",

      access: 'roles',

      validators: require('../validators'),

      filled,
      singleFilled,
      resFilled
    };
};

module.exports = app();
