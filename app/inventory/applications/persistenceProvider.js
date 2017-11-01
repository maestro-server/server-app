'use strict';

const _ = require('lodash');

const hateaosTransform = require('core/applications/transforms/hateoasTransform');
const DPersistenceServices = require('core/services/PersistenceServices');
const aclRoles = require('core/applications/transforms/aclRoles');
const tokenGenerator = require('../transforms/tokenTransform');
const Access = require('core/entities/accessRole');
const notExist = require('core/applications/validator/validNotExist');

const {DiscoveryHTTPService} = require('core/services/HTTPService');

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

        task(req, res, next) {
            const type = _.get(req.body, 'type', 'parcial');

            PersistenceServices(Entity)
                .findOne(req.params.id, req.user)
                .then(notExist)
                .then((e) => {
                    return DiscoveryHTTPService()
                        .update(`/crawler/${e.name}/${req.params.id}/${req.params.command}/${type}`);
                })
                .then(e => res.json(e))
                .catch(next);
        }
    };
};

module.exports = _.curry(ApplicationProvider);
