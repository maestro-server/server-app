'use strict';

const Joi = require('joi');

const schema = Joi.object().keys({
    owner: Joi.any(),
    members: Joi.any(),
    active: Joi.boolean(),
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email(),
    url: Joi.string().uri({scheme: ['http', 'https']})
});

module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
}
