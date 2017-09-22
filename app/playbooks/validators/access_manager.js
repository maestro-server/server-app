'use strict';

const Joi = require('joi');

const schema = Joi.object().keys({
    owner: Joi.any(),
    active: Joi.boolean(),
    roles: Joi.any(),
    name: Joi.string().min(3).max(30).required(),
    created_at: Joi.any()
});

module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
