'use strict';

const Joi = require('joi');

const {roles, owner} = require('core/validators/validators');

const create = {
  name: Joi.string().min(3).max(30).required()
};

const scheme = {
    name: Joi.string().min(3).max(30),
    zones: Joi.array(),
    regions: Joi.array(),
    provider: Joi.string(),
    sucessed: Joi.boolean(),
    owner,
    auth: Joi.array(),
    roles: Joi.array().items(roles).unique('_id'),
    metas: Joi.any(),
    active: Joi.boolean(),
    created_at: Joi.any()
};

module.exports = {
    create: Joi.object().keys(Object.assign({}, scheme, create)),
    update: Joi.object().keys(Object.assign({}, scheme)),
    delete: {},
    list: {}
};
