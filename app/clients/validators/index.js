'use strict';

const Joi = require('joi');

const schema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email(),
    description: Joi.string(),
    phone: Joi.string(),
    url: Joi.string().uri({scheme: ['http', 'https']}),
    meta: Joi.any(),
    owner: Joi.any(),
    roles: Joi.any(),
    active: Joi.boolean()
});

module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
