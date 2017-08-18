'use strict';

const _ = require('lodash');

const Applications = require('../repositories/dao/applications');

const app = () => {
    const resFilled = ['_id', 'updated_at', 'created_at', 'name', 'family', 'environment', 'system.name', 'system._id', 'servers', 'role', 'spec', 'language', 'cluster', 'deploy', 'tags', 'description'];

    const singleFilled = [...resFilled, 'roles', 'system', 'owner'];

    const filled = [..._.slice(singleFilled, 3)]; // delete id

    return {
        name: "applications",

        access: 'roles',

        validators: require('../validators/applications'),

        dao: Applications,

        defaults: {family: 'Application'},

        mapRelations: ['system._id'],

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = app();