'use strict';

const Joi = require('joi');
const {family, environment, entries} = require('core/validators/validators');

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

const updateBatchDeps = {
    tree: Joi.object(),
    systems: Joi.array().max(3).items(entries).unique()
};


module.exports = {
    create: Joi.object().keys(addDep),
    update: Joi.object().keys(updateDep),
    updateMany: Joi.object().keys(updateBatchDeps)
};
