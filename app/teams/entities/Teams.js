'use strict';

const _ = require('lodash');

const Teams = require('../repositories/dao/db');

const teams = () => {
    const resFilled = ['_id', 'name', 'email', 'url', 'members', 'owner'];

    const singleFilled = [...resFilled, 'meta'];

    const filled = [..._.tail(singleFilled)]; // delete id

    return {
      name: "teams",

      access: 'members',

      validators: require('../validators'),

      dao: Teams,

      filled,
      singleFilled,
      resFilled
    };
};

module.exports = teams();
