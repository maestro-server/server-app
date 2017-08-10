'use strict';

const _ = require('lodash');

const Clients = require('../repositories/dao/db');

const clients = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'description', 'email', 'phone', 'url'];

    const singleFilled = [...resFilled, 'meta', 'roles', 'owner'];

    const filled = [..._.slice(singleFilled, 3)]; // delete id

    return {
      name: "clients",

      access: 'roles',

      validators: require('../validators'),

      dao: Clients,

      filled,
      singleFilled,
      resFilled
    };
};

module.exports = clients();
