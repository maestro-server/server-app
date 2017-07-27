'use strict';

const _ = require('lodash');

const Architectures = require('../repositories/dao/db');

const arch = () => {
    const resFilled = ['_id', 'name'];

    const singleFilled = [...resFilled, 'description', 'meta', 'roles', 'owner'];

    const filled = [..._.tail(singleFilled)]; // delete id

    return {
      name: "architectures",

      access: 'roles',

      validators: require('../validators'),

      dao: Architectures,

      filled,
      singleFilled,
      resFilled
    };
};

module.exports = arch();
