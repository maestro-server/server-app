'use strict';

const Joi = require('joi');

const {roles, owner} = require('core/validators/validators');

const schema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    component: Joi.string().min(3).max(30).required(),
    report: Joi.string().valid('general', 'pivot'),
    msg: Joi.string(),
    filters: Joi.array(),
    status: Joi.string().valid('process', 'finished', 'error').default('process'),
    roles: Joi.array().items(roles).unique('_id'),
    owner,
    active: Joi.boolean(),
    created_at: Joi.any()
});

module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
