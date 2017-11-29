'use strict';

const Joi = require('joi');
const {roles, tags, owner} = require('core/validators/validators');

const schema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    image_type: Joi.string().max(80),
    image_location: Joi.string().max(30),
    plataform: Joi.string().max(30),
    storage: Joi.object(),
    state: Joi.string().max(20),
    datacenters: Joi.object(),
    owner,
    roles: Joi.array().items(roles).unique('_id'),
    tags: Joi.array().items(tags),
    active: Joi.boolean(),
    created_at: Joi.any()
});

module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
