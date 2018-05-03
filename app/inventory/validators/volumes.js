'use strict';

const Joi = require('joi');
const {roles, tags, owner, created_at, unique_id, active} = require('core/validators/validators');

const schema = Joi.object().keys({
    status: Joi.string().valid('Active', 'Avaliable', 'Stopped').default('Active'),
    name: Joi.string().min(3).max(80).required(),
    size: Joi.number().required(),
    encrypted: Joi.string().max(30),
    kms_key_id: Joi.string().max(30),
    iops: Joi.number(),
    volume_id: Joi.string().max(30),
    volume_type: Joi.string().max(50),
    attach_time: Joi.string().max(20),
    state: Joi.string().max(20),
    owner,
    datacenters: Joi.object(),
    roles: Joi.array().items(roles).unique('_id'),
    tags: Joi.array().items(tags),
    unique_id: unique_id.required(),
    active,
    created_at
});


module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
