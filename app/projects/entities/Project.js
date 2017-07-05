'use strict';

const _ = require('lodash');

const projects = () => {
    const resFilled = ['_id', 'name'];

    const singleFilled = [...resFilled, 'meta', 'roles', 'owner'];

    const filled = [..._.tail(singleFilled)]; // delete id

    return {
      name: "projects",

      access: 'roles',

      validators: require('../validators'),

      filled,
      singleFilled,
      resFilled
    };
};

module.exports = projects();
