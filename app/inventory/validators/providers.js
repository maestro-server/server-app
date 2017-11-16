'use strict';

const Joi = require('joi');

const {roles, owner} = require('core/validators/validators');

const schema = Joi.object().keys({
    conn: Joi.string().max(900).required(),
    name: Joi.string().max(250).required(),
    roles: Joi.array().items(roles).unique('_id'),
    dc: Joi.string().max(150).required(),
    provider: Joi.string().max(30).required(),
    regions: Joi.array().unique().required(),
    owner,
    owner_user: roles,
    active: Joi.boolean(),
    created_at: Joi.any()
});

module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
