'use strict';

const _ = require('lodash');

const Projects = require('../repositories/dao/projects');

const projects = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name'];

    const singleFilled = [...resFilled, 'meta', 'roles', 'owner'];

    const filled = [..._.slice(singleFilled, 3)]; // delete id

    return {
      name: "projects",

      access: 'roles',

      validators: require('../validators/projects'),

      dao: Projects,

      filled,
      singleFilled,
      resFilled
    };
};

module.exports = projects();
