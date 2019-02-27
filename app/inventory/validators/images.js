'use strict';

const Joi = require('joi');
const {roles, tags, owner, created_at, unique_id, active} = require('core/validators/validators');

const schema = Joi.object().keys({
    name: Joi.string().min(3).max(120).required(),
    image_type: Joi.string().max(80),
    image_location: Joi.string().max(200),
    plataform: Joi.string().max(30),
    storage: Joi.any(),
    state: Joi.string().max(20),
    datacenters: Joi.object(),
    distribution:Joi.string(),
    slug: Joi.string(),
    root_device_type: Joi.string(),
    status: Joi.string(),
    hypervisor: Joi.string(),
    public: Joi.any(),
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
