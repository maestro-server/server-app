'use strict';

const Joi = require('joi');

const {id, roles, deploy, entities, tags, owner, pdbs, asm_groups, datacenters, environment, family, active, status, created_at} = require('core/validators/validators');


const schema = Joi.object().keys({
    name: Joi.string().min(3).max(150).required(),
    description: Joi.string().max(800),
    system:  Joi.array().items(entities).unique(),
    servers: Joi.array().items(id).unique(),
    targets: Joi.array().items(id).unique(),
    own: Joi.number().max(1),
    role: Joi.any(),
    language: Joi.string().min(3).max(30),
    provider: Joi.string().min(3).max(20),
    cluster:  Joi.string().max(100),
    dataguard: Joi.string().max(40),
    storage_types: Joi.string().max(40),
    asm_groups: Joi.array().items(asm_groups),
    pdbs: Joi.array().items(pdbs),
    crs_version: Joi.string().max(40),
    deploy: Joi.array().items(deploy),
    type: Joi.string().min(3).max(30),
    modal: Joi.string().max(30),
    roles: Joi.array().items(roles).unique('_id'),
    tags: Joi.array().items(tags),
    status,
    datacenters,
    environment,
    family,
    owner,
    active,
    created_at
});

module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
