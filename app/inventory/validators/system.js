'use strict';

const Joi = require('joi');
const {entities, roles, tags, owner, created_at, active} = require('core/validators/validators');

const schema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().max(800),
    clients:  Joi.array().items(entities).unique(),
    check:  Joi.array().items(tags).unique(),
    owner,
    roles: Joi.array().items(roles).unique('_id'),
    tags: Joi.array().items(tags),
    active,
    created_at
});

module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
