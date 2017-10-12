'use strict';

const Joi = require('joi');

const {roles, tags, contacts, owner} = require('core/validators/validators')

const schema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().max(800),
    contacts:  Joi.array().items(contacts).unique(),
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
