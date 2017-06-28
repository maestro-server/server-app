'use strict';

const _ = require('lodash');

module.exports = function (owner, role, fielder = 'roles') {

    let enc = _.pick(owner, 'refs', '_id', 'name', 'email');
    enc = [_.merge(enc, {role}),];

    return {[fielder]: enc};
};
