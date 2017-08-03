'use strict';

const _ = require('lodash');

const Applications = require('../repositories/dao/db');

const app = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'system', 'servers', 'role'];

    const singleFilled = [...resFilled, 'description', 'meta', 'roles', 'owner'];

    const filled = [..._.slice(singleFilled, 3)]; // delete id

    return {
      name: "applications",

      access: 'roles',

      validators: require('../validators'),

      dao: Applications,

      filled,
      singleFilled,
      resFilled
    };
};

module.exports = app();
