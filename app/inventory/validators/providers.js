'use strict';

const Joi = require('joi');

const {roles, owner} = require('core/validators/validators');

const schema = Joi.object().keys({
    conn: Joi.string().max(900).required(),
    name: Joi.string().max(30).required(),
    roles: Joi.array().items(roles).unique('_id'),
    dc: Joi.string().max(150).required(),
    owner,
    active: Joi.boolean()
});

module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
