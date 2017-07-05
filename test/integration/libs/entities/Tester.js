'use strict';

const tester = () => {
    const fill = ['name', 'roles', 'owner'];

    return {
      name: "tester",

      access: 'roles',

      validators: require('../validators'),

      filled: fill,
      singleFilled: ['_id', ...fill],
      resFilled: ['_id', ...fill]
    }
};

module.exports = tester();
