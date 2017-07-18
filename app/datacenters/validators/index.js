'use strict';

const Joi = require('joi');

const schema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    system: Joi.any(),
    role: Joi.any(),
    zones: Joi.array(),
    regions: Joi.array(),
    provider: Joi.string(),
    owner: Joi.any(),
    auth: Joi.any(),
    roles: Joi.any(),
    active: Joi.boolean()
});

module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};

'zones', 'provider', 'role'