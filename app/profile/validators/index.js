'use strict';

const Joi = require('joi');

const createS = {
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(30).required().strip()
}

const sharedS = {
    name: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(4).max(30).strip(),
    active: Joi.boolean(),
    fullname: Joi.string(),
    phone: Joi.string(),
    company: Joi.string(),
    avatar: Joi.string().uri(),
    job: Joi.string(),
    country: Joi.string(),
    city: Joi.string(),
    address: Joi.string()
}

module.exports = {
    create: Joi.object().keys(Object.assign({}, createS, sharedS)),
    update: Joi.object().keys(sharedS),
    delete: {},
    list: {}
}
