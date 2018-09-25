'use strict';

const Joi = require('joi');

const {family, environment} = require('core/validators/validators');

const addDep = {
    _id: Joi.string().required(),
    name: Joi.string().required(),
    family: family.required(),
    environment
};

const updateDep = {
    name: Joi.string().required(),
    family: family.required(),
    environment
};

module.exports = {
    create: Joi.object().keys(addDep),
    update: Joi.object().keys(updateDep)
};
