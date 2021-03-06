'use strict';

const Joi = require('joi');

const {roles, owner, created_at, active} = require('core/validators/validators');

const schema = Joi.object().keys({
    conn: Joi.string().max(10800).required(),
    name: Joi.string().max(4050).required(),
    url: Joi.string().max(250),
    project: Joi.string().max(250),
    method: Joi.string().max(250),
    status: Joi.string().required(),
    roles: Joi.array().items(roles).unique('_id'),
    dc: Joi.string().max(150).required(),
    provider: Joi.string().max(30).required(),
    service: Joi.string().max(30).required(),
    regions: Joi.array().unique().required(),
    dc_id: Joi.string().max(250).required(),
    user_domain_id: Joi.string().max(250),
    api_version: Joi.string().max(5),
    tab: Joi.number().min(0).max(3).default(0),
    owner,
    owner_user: roles,
    process: Joi.any(),
    active,
    created_at
});

module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
