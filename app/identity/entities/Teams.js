 'use strict';

const _ = require('lodash');

const Teams = require('../repositories/dao/teams');

const teams = () => {
    const resFilled = ['_id', 'updated_at', 'name', 'email', 'url', 'avatar', 'members', 'owner'];

    const singleFilled = [...resFilled];

    const filled = [..._.slice(singleFilled, 2)]; // delete id

    return {
      name: "teams",

      access: 'members',

      validators: require('../validators/teams'),

      dao: Teams,

      filled,
      singleFilled,
      resFilled
    };
};

module.exports = teams();
