'use strict';

const _ = require('lodash');

const adminer = () => {
    const resFilled = ['_id', 'options'];

    const singleFilled = [...resFilled, 'roles', 'owner'];

    const filled = [..._.tail(singleFilled)]; // delete id

    return {
      name: "adminer",

      access: 'roles',

      validators: require('../validators'),

      filled,
      singleFilled,
      resFilled
    };
};

module.exports = adminer();
