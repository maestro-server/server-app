'use strict';

const _ = require('lodash');
const Adminer = require('../repositories/dao/adminer');

const adminer = () => {
    const resFilled = ['_id', 'key', 'entities', 'value'];

    const singleFilled = [...resFilled];

    const filled = [..._.tail(singleFilled)]; // delete id

    return {
      name: "adminer",

      access: null,

      validators: require('../validators/adminer'),

      dao: Adminer,

      filled,
      singleFilled,
      resFilled
    };
};

module.exports = adminer();
