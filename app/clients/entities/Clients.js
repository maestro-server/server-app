'use strict';

const _ = require('lodash');

const Clients = require('../repositories/dao/db');

const clients = () => {
    const resFilled = ['_id', 'name', 'description', 'email', 'phone', 'url'];

    const singleFilled = [...resFilled, 'meta', 'roles', 'owner'];

    const filled = [..._.tail(singleFilled)]; // delete id

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
