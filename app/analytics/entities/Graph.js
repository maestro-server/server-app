'use strict';

const _ = require('lodash');

const Graphs = require('../repositories/dao/graphs');

const graphs = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'tab', 'status', 'systems', 'clients', 'apps'];

    const singleFilled = [...resFilled, 'msg', 'type', 'roles', 'owner'];

    const filled = [..._.slice(singleFilled, 2)]; // delete id

    return {
      name: "graphs",

      access: 'roles',

      validators: require('../validators/graphs'),

      dao: Graphs,

      mapRelations: ['systems', 'apps', 'clients'],

      filled,
      singleFilled,
      resFilled
    };
};

module.exports = graphs();
