'use strict';

const _ = require('lodash');
const formatRole = require('core/applications/transforms/formatFirstRole');


module.exports = function (buser, Entity, access) {

    if (_.get(Entity, 'access', false)) {
        const user = _.defaults(buser, {'refs': "users"});
        const owner = _.pick(user, 'name', 'email', '_id', 'refs');

        return Object.assign({},
            {owner},
            formatRole(owner, access, Entity.access)
        );
    }

    return {};
};
