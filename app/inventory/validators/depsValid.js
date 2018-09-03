'use strict';

const Joi = require('joi');

const {family} = require('core/validators/validators');

const addDep = {
    id: Joi.string().required(),
    name: Joi.string().required(),
    family: family.required()
};

const updateDep = {
    name: Joi.string().required(),
    family: family.required()
};

module.exports = {
    create: Joi.object().keys(addDep),
    update: Joi.object().keys(updateDep)
};
