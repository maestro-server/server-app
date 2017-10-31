'use strict';

const _ = require('lodash');

const hateaosTransform = require('core/applications/transforms/hateoasTransform');
const DPersistenceServices = require('core/services/PersistenceServices');
const aclRoles = require('core/applications/transforms/aclRoles');
const tokenGenerator = require('../transforms/tokenTransform');
const notExist = require('core/applications/validator/validNotExist');

const Check = require('../services/CheckTask');
const Access = require('core/entities/accessRole');

const ApplicationProvider = (Entity, PersistenceServices = DPersistenceServices) => {

    return {
        create(req, res, next) {
            _.defaults(req.body, Entity.defaults || {});

            const conn = tokenGenerator(_.get(req.body, 'conn', {}));

            const bodyWithOwner = Object.assign(
                {},
                req.body,
                {conn},
                aclRoles(req.user, Entity, Access.ROLE_ADMIN)
            );

            PersistenceServices(Entity)
                .create(bodyWithOwner)
                .then(hateaosTransform(Entity).singleTransform)
                .then(e => res.status(201).json(e))
                .catch(next);
        },

        gettask(req, res, next) {

        },

        task(req, res, next) {

            PersistenceServices(Entity)
                .findOne(req.params.id, req.user)
                .then(notExist)
                .then(Check)
                .then(e => res.json(e))
                .catch(next);
        }
    };
};

module.exports = _.curry(ApplicationProvider);
