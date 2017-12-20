'use strict';

const _ = require('lodash');
const Services = require('../repositories/dao/services');

const adminer = () => {
    const resFilled = ['_id', 'active', 'name', 'tags', 'owner', 'family'];

    const singleFilled = [...resFilled];

    const filled = [..._.slice(singleFilled, 1)]; // delete id

    return {
      name: "services",

      access: null,

      validators: require('../validators/services'),

      dao: Services,

      filled,
      singleFilled,
      resFilled
    };
};

module.exports = adminer();
