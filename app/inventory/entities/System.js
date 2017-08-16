'use strict';

const _ = require('lodash');

const System = require('../repositories/dao/system');

const system = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'description', 'check', 'tags', 'clients'];

    const singleFilled = [...resFilled, 'description', 'meta', 'roles', 'owner'];

    const filled = [..._.slice(singleFilled, 3)];  // delete id

    return {
      name: "systems",

      access: 'roles',

      validators: require('../validators/system'),

      dao: System,

      filled,
      singleFilled,
      resFilled
    };
};

module.exports = system();
