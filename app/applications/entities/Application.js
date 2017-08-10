'use strict';

const _ = require('lodash');

const Applications = require('../repositories/dao/db');

const app = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'environment', 'system.name', 'system._id', 'servers', 'role', 'spec', 'language', 'cluster', 'deploy', 'tags'];

    const singleFilled = [...resFilled, 'description', 'roles', 'owner'];

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
