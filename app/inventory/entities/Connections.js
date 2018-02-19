'use strict';

const _ = require('lodash');

const Connection = require('../repositories/dao/connection');

const connection = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'conn', 'status', 'roles', 'dc',
        'owner_user', 'regions', 'provider', 'url', 'project', 'dc_id'];

    const singleFilled = [...resFilled, 'process', 'owner'];

    const filled = [..._.slice(singleFilled, 2)];  // delete id

    return {
        name: "connections",

        access: 'roles',

        validators: require('../validators/connections'),

        dao: Connection,

        defaults: {'status': 'enabled'},

        mapRelations: ['owner_user'],

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = connection();
