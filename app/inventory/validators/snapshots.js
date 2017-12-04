'use strict';

const Joi = require('joi');
const {roles, tags, owner, created_at, active} = require('core/validators/validators');

const schema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    state: Joi.string().max(20),
    volume_id: Joi.string().max(80),
    volume_size: Joi.number(),
    kms_key_id: Joi.string().max(80),
    encrypted: Joi.string().max(80),
    description: Joi.string().max(300),
    data_encryption_key_id: Joi.string().max(80),
    owner_id: Joi.string().max(80),
    start_time: Joi.string().max(80),
    owner_alias: Joi.string().max(80),
    state_message: Joi.string().max(80),
    datacenters: Joi.object(),
    owner,
    roles: Joi.array().items(roles).unique('_id'),
    tags: Joi.array().items(tags),
    active,
    created_at
});

module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
