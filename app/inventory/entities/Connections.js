'use strict';

const _ = require('lodash');

const Connection = require('../repositories/dao/connection');

const connection = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'conn', 'auth_api', 'translate_api', 'status', 'roles', 'dc', 'active', 'service',
        'owner_user', 'regions', 'provider', 'url', 'project', 'dc_id', 'user_domain_id', 'api_version', 'tab'];

    const singleFilled = [...resFilled, 'process', 'owner'];

    const filled = [..._.slice(singleFilled, 2)];  // delete id

    return {
        name: "connections",

        access: 'roles',

        validators: require('../validators/connections'),

        dao: Connection,

        defaults: {'status': 'enabled'},

        mapRelations: ['owner_user'],

        visibility: {single: 'all'},

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = connection();
