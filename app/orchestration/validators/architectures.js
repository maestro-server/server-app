'use strict';

const Joi = require('joi');

const {roles, owner, created_at, active} = require('core/validators/validators');

const schema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    roles: Joi.array().items(roles).unique('_id'),
    owner,
    active,
    created_at
});

module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
