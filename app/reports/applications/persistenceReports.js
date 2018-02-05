'use strict';

const _ = require('lodash');

const DPersistenceServices = require('core/services/PersistenceServices');
const aclRoles = require('core/applications/transforms/aclRoles');
const Access = require('core/entities/accessRole');
const notExist = require('core/applications/validator/validNotExist');

const mapRelationToObjectID = require('core/applications/transforms/mapRelationToObjectID');

const {ReportHTTPService} = require('core/services/HTTPService');

const ApplicationReport = (Entity, PersistenceServices = DPersistenceServices) => {

    return {
        create (req, res, next) {
            _.defaults(req.body, Entity.defaults || {});

            const bodyWithOwner = Object.assign(
                {},
                mapRelationToObjectID(req.body, Entity.mapRelations),
                aclRoles(req.user, Entity, Access.ROLE_READ)
            );

            const owner_user = _.get(req, 'user._id')

            PersistenceServices(Entity)
                .create(bodyWithOwner)
                .then((e) => {
                    const data = {
                        "report_id": e["_id"],
                        "component": e['component'],
                        "filters": JSON.stringify(e['filters'], null, 2),
                        owner_user
                    }

                    return ReportHTTPService()
                        .create(`/${e.report}`, data);
                })
                .then(e => res.status(201).json(e))
                .catch(next);

        },

        remove (req, res, next) {
            PersistenceServices(Entity)
                .remove(req.params.id, req.user)
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

module.exports = _.curry(ApplicationReport);