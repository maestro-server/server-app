'use strict';

const _ = require('lodash');

const Datacenters = require('../repositories/dao/db');

const app = () => {
    const resFilled = ['_id', 'name', 'zones', 'regions', 'provider', 'role', 'metas'];

    const singleFilled = [...resFilled, 'roles', 'owner', 'auth'];

    const filled = [..._.tail(singleFilled)]; // delete id

    return {
      name: "datacenters",

      access: 'roles',

      validators: require('../validators'),

      dao: Datacenters,

      filled,
      singleFilled,
      resFilled
    };
};

module.exports = app();
