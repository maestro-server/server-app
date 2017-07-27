'use strict';

const _ = require('lodash');

const Projects = require('../repositories/dao/db');

const projects = () => {
    const resFilled = ['_id', 'name'];

    const singleFilled = [...resFilled, 'meta', 'roles', 'owner'];

    const filled = [..._.tail(singleFilled)]; // delete id

    return {
      name: "projects",

      access: 'roles',

      validators: require('../validators'),

      dao: Projects,

      filled,
      singleFilled,
      resFilled
    };
};

module.exports = projects();
