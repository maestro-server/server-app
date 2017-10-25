'use strict';

const _ = require('lodash');

const hateaosTransform = require('core/applications/transforms/hateoasTransform');
const DPersistenceServices = require('core/services/PersistenceServices');
const aclRoles = require('core/applications/transforms/aclRoles');
const tokenGenerator = require('../transforms/tokenTransform');

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

        checkTask(req, res, next) {
            res.status(201).json(e);
        }
    };
};

module.exports = _.curry(ApplicationProvider);
