'use strict';

const _ = require('lodash');

const system = () => {
    const resFilled = ['_id', 'name', 'clients'];

    const singleFilled = [...resFilled, 'description', 'meta', 'roles', 'owner'];

    const filled = [..._.tail(singleFilled)]; // delete id

    return {
      name: "systems",

      access: 'roles',

      validators: require('../validators/system'),

      filled,
      singleFilled,
      resFilled
    };
};

module.exports = system();
