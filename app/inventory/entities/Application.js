'use strict';

const _ = require('lodash');

const Applications = require('../repositories/dao/applications');

const app = () => {
    const resFilled = ['_id', 'updated_at', 'created_at',
    'name', 'status', 'family', 'environment', 'provider', 'own',
    'system.name', 'system._id', 'servers',
    'targets', 'role.role', 'role', 'spec', 'asm_groups',
    'language', 'cluster', 'dataguard', 'type', 'storage_types',
    'crs_version', 'modal', 'pdbs', 'datacenters',
    'deploy', 'tags', 'description'];

    const singleFilled = [...resFilled, 'roles', 'system', 'owner'];

    const filled = [..._.slice(singleFilled, 3)]; // delete id

    return {
        name: "applications",

        access: 'roles',

        validators: require('../validators/applications'),

        dao: Applications,

        defaults: {family: 'Application'},

        mapRelations: ['system'],

        filled,
        singleFilled,
        resFilled
    };
};

module.exports = app();
