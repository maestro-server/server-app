'use strict';

const Joi = require('joi');

const {roles, owner, entries} = require('core/validators/validators');

const schema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    roles: Joi.array().items(roles).unique('_id'),
    type: Joi.string().valid('bussiness', 'infra').required(),
    tab: Joi.number().min(0).max(3).default(0),
    clients: Joi.array().items(entries).unique(),
    systems: Joi.array().items(entries).unique(),
    apps: Joi.array().items(entries).unique(),
    info: Joi.any(),
    spublic: Joi.boolean(),
    iclients: Joi.any(),
    iservers: Joi.any(),
    isystems: Joi.any(),
    ifamilies: Joi.any(),
    msg: Joi.string(),
    filters: Joi.any(),
    status: Joi.string().valid('process', 'finished', 'error', 'warning').default('process'),
    owner,
    active: Joi.boolean(),
    created_at: Joi.any()
});

const update = Joi.object().keys({
    name: Joi.string().min(3).max(30),
    roles: Joi.array().items(roles).unique('_id'),
    type: Joi.string().valid('bussiness', 'infra'),
    tab: Joi.number().min(0).max(3).default(0),
    clients: Joi.array().items(entries).unique(),
    systems: Joi.array().items(entries).unique(),
    apps: Joi.array().items(entries).unique(),
    info: Joi.any(),
    spublic: Joi.boolean(),
    iclients: Joi.any(),
    iservers: Joi.any(),
    isystems: Joi.any(),
    ifamilies: Joi.any(),
    msg: Joi.string(),
    filters: Joi.any(),
    status: Joi.string().valid('process', 'finished', 'error', 'warning'),
    owner,
    active: Joi.boolean(),
    created_at: Joi.any()
});

module.exports = {
    create: schema,
    update: update,
    delete: {},
    list: {}
};
