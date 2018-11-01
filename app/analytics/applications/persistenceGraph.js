'use strict';

const _ = require('lodash');

const DPersistenceServices = require('core/services/PersistenceServices');
const PersistenceApplication = require('core/applications/persistenceApplication');
const aclRoles = require('core/applications/transforms/aclRoles');
const notExist = require('core/applications/validator/validNotExist');
const Access = require('core/entities/accessRole');

const jsonParser = require('core/applications/transforms/jsonParser');
const mapRelationToObjectID = require('core/applications/transforms/mapRelationToObjectID');
const filterHooks = require('core/applications/transforms/filterHooks');
const {AnalyticsHTTPService} = require('core/services/HTTPService');

const PublicAnalyticsToken = require('../services/PublicAnalyticsToken');

const PersistenceGraph = (Entity, PersistenceServices = DPersistenceServices) => {

    return {
        find(req, res, next) {
            const field = 'query';
            let query = _.clone(req.query);

            query = jsonParser(query, field);

            query = filterHooks(query, field, [
                {dest: 'systems.name', source: 'lsystem', module: 'swap'}
            ]);

            Object.assign(req, { query });
            PersistenceApplication(Entity, PersistenceServices)
                .find(req, res, next);
        },

        update(req, res, next) {

            _.defaults(req.body, Entity.defaults || {});
            req.body.status = 'process';

            const bodyWithOwner = Object.assign(
                {},
                mapRelationToObjectID(req.body, Entity.mapRelations)
            );

            const owner_id = _.get(req, 'user._id');

            PersistenceServices(Entity)
                .update(req.params.id, bodyWithOwner, req.user)
                .then(() => {
                    const data = Object.assign(
                        {owner_id},
                        _.pick(bodyWithOwner, ['_id', 'clients', 'systems', 'apps', 'type'])
                    )

                    return AnalyticsHTTPService()
                        .create(`/graph`, data);
                })
                .then(e => res.status(202).json(e))
                .catch(next);
        },

        create(req, res, next) {
            _.defaults(req.body, Entity.defaults || {});

            const bodyWithOwner = Object.assign(
                {},
                mapRelationToObjectID(req.body, Entity.mapRelations),
                aclRoles(req.user, Entity, Access.ROLE_ADMIN)
            );

            const owner_id = _.get(req, 'user._id');

            PersistenceServices(Entity)
                .create(bodyWithOwner)
                .then((e) => {
                    const data = Object.assign(
                        {owner_id},
                        _.pick(e, ['_id', 'clients', 'systems', 'apps', 'type'])
                    )
                    return AnalyticsHTTPService()
                        .create(`/graph`, data);
                })
                .then(e => res.status(201).json(e))
                .catch(next);

        },

        createPublicToken(req, res, next) {

            const _id = _.get(req.params, 'id');
            const spublic = _.get(req.body, 'public', true);

            PersistenceServices(Entity)
                .patch(req.params.id, {spublic}, req.user)
                .then(notExist)
                .then(() => PublicAnalyticsToken(Entity).generate(_id))
                .then(e => res.status(201).json(e))
                .catch(next);
        }
    };
};

module.exports = _.curry(PersistenceGraph);
