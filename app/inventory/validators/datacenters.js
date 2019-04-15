'use strict';

const Joi = require('joi');

const {roles, owner, metas, created_at, active} = require('core/validators/validators');

const create = {
  name: Joi.string().min(3).max(30).required()
};

const scheme = {
    name: Joi.string().min(3).max(30),
    zones: Joi.array().unique(),
    regions: Joi.array().unique(),
    provider: Joi.string().required(),
    sucessed: Joi.boolean(),
    reports: Joi.array(),
    owner,
    auth: Joi.array(),
    roles: Joi.array().items(roles).unique('_id'),
    metas,
    active,
    created_at
};

module.exports = {
    create: Joi.object().keys(Object.assign({}, scheme, create)),
    update: Joi.object().keys(Object.assign({}, scheme)),
    delete: {},
    list: {}
};
