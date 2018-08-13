'use strict';

const _ = require('lodash');

const DPersistenceServices = require('core/services/PersistenceServices');
const aclRoles = require('core/applications/transforms/aclRoles');
const Access = require('core/entities/accessRole');

const mapRelationToObjectID = require('core/applications/transforms/mapRelationToObjectID');

const {AnalyticsHTTPService} = require('core/services/HTTPService');

const ApplicationReport = (Entity, PersistenceServices = DPersistenceServices) => {

    return {
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

        }
    };
};

module.exports = _.curry(ApplicationReport);
