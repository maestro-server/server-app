'use strict';

const Tester = require('../repositories/dao/db');

const tester = () => {
    const fill = ['name', 'roles', 'owner', 'increment', 'changer', 'unique_id'];

    return {
      name: "tester",

      access: 'roles',

      validators: require('../validators'),

      dao: Tester,

      filled: fill,
      singleFilled: ['_id', ...fill],
      resFilled: ['_id', ...fill]
    }
};

module.exports = tester();
