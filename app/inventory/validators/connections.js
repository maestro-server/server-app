'use strict';

const Joi = require('joi');

const {roles, owner, created_at, active} = require('core/validators/validators');

const schema = Joi.object().keys({
    conn: Joi.string().max(900).required(),
    name: Joi.string().max(250).required(),
    url: Joi.string().max(250),
    project: Joi.string().max(250),
    status: Joi.string().max(10),
    roles: Joi.array().items(roles).unique('_id'),
    dc: Joi.string().max(150).required(),
    provider: Joi.string().max(30).required(),
    regions: Joi.array().unique().required(),
    dc_id: Joi.string().max(250).required(),
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