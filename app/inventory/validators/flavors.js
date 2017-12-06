'use strict';

const Joi = require('joi');
const {roles, tags, owner, created_at, unique_id, active} = require('core/validators/validators');

const schema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    api_name: Joi.string().min(3).max(30),
    provider: Joi.string().min(3).max(30),
    datacenters: Joi.object(),
    owner,
    roles: Joi.array().items(roles).unique('_id'),
    tags: Joi.array().items(tags),
    unique_id,
    active,
    created_at
});

module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
