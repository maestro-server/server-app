'use strict';

const _ = require('lodash');

const Architectures = require('../repositories/dao/db');

const arch = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name'];

    const singleFilled = [...resFilled, 'description', 'meta', 'roles', 'owner'];

    const filled = [..._.slice(singleFilled, 3)]; // delete id

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
