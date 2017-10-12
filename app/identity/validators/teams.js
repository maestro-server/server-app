'use strict';

const Joi = require('joi');

const {roles, owner} = require('core/validators/validators')

const schema = Joi.object().keys({
    owner,
    members: Joi.array().items(roles).unique('_id'),
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email(),
    avatar: Joi.string().min(3).max(200),
    url: Joi.string().uri({scheme: ['http', 'https']}),
    active: Joi.boolean()
});

module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
