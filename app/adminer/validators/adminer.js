'use strict';

const Joi = require('joi');

const schema = Joi.object().keys({
    key: Joi.string().min(3).max(15).required(),
    value: Joi.any().required(),
    active: Joi.boolean()
});

module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
