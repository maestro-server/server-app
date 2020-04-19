'use strict';

const Joi = require('joi');
const {roles, tags, owner, created_at, unique_id, active, status} = require('core/validators/validators');

const schema = Joi.object().keys({
    status,
    name: Joi.string().min(3).max(80).required(),
    size: Joi.number().required(),
    encrypted: Joi.string().max(30),
    kms_key_id: Joi.string().max(30),
    iops: Joi.number(),
    volume_id: Joi.string().max(30),
    volume_type: Joi.string().max(50),
    attach_time: Joi.string().max(20),
    state: Joi.string().max(20),
    storage_account_type: Joi.string(),
    write_accelerator_enabled: Joi.any(),
    create_option: Joi.string().max(100),
    vhd: Joi.string(),
    diff_disk_settings: Joi.string(),
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
