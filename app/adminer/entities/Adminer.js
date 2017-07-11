'use strict';

const _ = require('lodash');

const adminer = () => {
    const resFilled = ['_id', 'key', 'entities', 'value'];

    const singleFilled = [...resFilled];

    const filled = [..._.tail(singleFilled)]; // delete id

    return {
      name: "adminer",

      access: null,

      validators: require('../validators'),

      filled,
      singleFilled,
      resFilled
    };
};

module.exports = adminer();
