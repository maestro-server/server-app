'use strict';

const Joi = require('joi');

const {roles, owner} = require('core/validators/validators');

const schema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    component: Joi.string().min(3).max(30),
    report: Joi.string().valid('general', 'pivot').required(),
    msg: Joi.string(),
    filters: Joi.any(),
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
