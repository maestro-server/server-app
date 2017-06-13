'use strict';

const Joi = require('joi');

const schema = Joi.object().keys({
    owner: Joi.any(),
    roles: Joi.any(),
    active: Joi.boolean(),
    name: Joi.string().min(3).max(30).required()
});

module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
}
