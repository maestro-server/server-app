'use strict';

const _ = require('lodash');

const Adminer = require('adminer/entities/Adminer');
const DPersistenceServices = require('core/services/PersistenceServices');
const aclRoles = require('core/applications/transforms/aclRoles');
const tokenGenerator = require('../transforms/tokenTransform');
const Access = require('core/entities/accessRole');
const notExist = require('core/applications/validator/validNotExist');
const validAccessEmpty = require('core/applications/validator/validAccessEmpty');
const DatacentersConnection = require('../services/DatacentersConnection');
const SchedulerBatch = require('../services/SchedulerBatchCreator');
const SchedulerBatchRemove = require('../services/SchedulerBatchRemove');

const {DiscoveryHTTPService} = require('core/services/HTTPService');

const ApplicationConnection = (Entity, PersistenceServices = DPersistenceServices) => {

    return {
        create(req, res, next) {
            _.defaults(req.body, Entity.defaults || {});

            const conn = tokenGenerator(_.get(req.body, 'conn', {}));
            const owner_user = _.assign(req.user, {'role': Access.ROLE_ADMIN});

            const bodyWithOwner = Object.assign(
                {},
                req.body,
                {conn},
                {owner_user},
                aclRoles(req.user, Entity, Access.ROLE_ADMIN)
            );

            Promise.all([
                    PersistenceServices(Entity).create(bodyWithOwner),
                    DatacentersConnection(req.body, req, PersistenceServices, Entity).connected(),
                    PersistenceServices(Adminer).find({key: 'connections'}, {})
                ])
                .then(SchedulerBatch(req)(PersistenceServices).batch)
                .then(e => res.status(201).json(e))
                .catch(next);
        },

        remove(req, res, next) {

            PersistenceServices(Entity)
                .findOne(req.params.id, req.user)
                .then(validAccessEmpty)
                .then(e => DatacentersConnection(e, req, PersistenceServices, Entity).disconnected())
                .then(() => SchedulerBatchRemove(req)(PersistenceServices).batch())
                .then(() => PersistenceServices(Entity).remove(req.params.id, req.user))
                .then(console.log)
                .then(e => res.status(204).json(e))
                .catch(next);
        },

        task(req, res, next) {
            PersistenceServices(Entity)
                .findOne(req.params.id, req.user)
                .then(notExist)
                .then((e) => {
                    return DiscoveryHTTPService()
                        .update(`/crawler/${e.provider}/${req.params.id}/${req.params.command}`);
                })
                .then(e => res.json(e))
                .catch(next);
        }
    };
};

module.exports = _.curry(ApplicationConnection);
