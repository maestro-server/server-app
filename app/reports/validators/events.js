'use strict';

const Joi = require('joi');

const {roles, owner} = require('core/validators/validators');

const schema = Joi.object().keys({
    msg: Joi.string().min(3).max(150).required(),
    status: Joi.string().min(3).max(150),
    context: Joi.string().min(3).max(30).required(),
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
