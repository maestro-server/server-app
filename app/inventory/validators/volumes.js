'use strict';

const Joi = require('joi');
const {roles, tags, owner, created_at, active} = require('core/validators/validators');

const schema = Joi.object().keys({
    name: Joi.string().min(3).max(30),
    size: Joi.number(),
    encrypted: Joi.string().max(30),
    kms_key_id: Joi.string().max(30),
    iops: Joi.string().max(20),
    volume_id: Joi.string().max(30),
    attach_time: Joi.string().max(20),
    state: Joi.string().max(20),
    owner,
    datacenters: Joi.object(),
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
