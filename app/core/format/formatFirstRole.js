'use strict';

const _ = require('lodash');

module.exports = function (owner, role, fielder = 'roles', create = true) {

    let enc = _.pick(owner, 'refs', '_id', 'name', 'email');

    if (create)
        enc = [_.merge(enc, {role}),];

    return {[fielder]: enc};
};
