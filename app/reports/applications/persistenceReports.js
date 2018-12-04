'use strict';

const _ = require('lodash');

const DPersistenceServices = require('core/services/PersistenceServices');
const aclRoles = require('core/applications/transforms/aclRoles');
const Access = require('core/entities/accessRole');
const validAccessEmpty = require('core/applications/validator/validAccessEmpty');

const mapRelationToObjectID = require('core/applications/transforms/mapRelationToObjectID');
const jsonParser = require('core/applications/transforms/jsonParser');
const regexFilterQuery = require('core/services/transforms/regexFilterQuery');
const notExist = require('core/applications/validator/validNotExist');

const {ReportHTTPService} = require('core/services/HTTPService');

const ApplicationReport = (Entity, PersistenceServices = DPersistenceServices) => {

    return {
        create(req, res, next) {
            _.defaults(req.body, Entity.defaults || {});

            const bodyWithOwner = Object.assign(
                {},
                mapRelationToObjectID(req.body, Entity.mapRelations),
                aclRoles(req.user, Entity, Access.ROLE_ADMIN)
            );

            const owner_user = _.get(req, 'user._id');

            PersistenceServices(Entity)
                .create(bodyWithOwner)
                .then((e) => {
                    const data = {
                        "report_id": e["_id"],
                        "component": e['component'],
                        "filters": JSON.stringify(e['filters'], null, 2),
                        owner_user
                    };

                    return ReportHTTPService()
                        .create(`/reports/${e['report']}`, data);
                })
                .then(e => res.status(201).json(e))
                .catch(next);

        },

        update(req, res, next) {
            _.defaults(req.body, Entity.defaults || {});

            const bodyWithOwner = Object.assign(
                {},
                mapRelationToObjectID(req.body, Entity.mapRelations),
                aclRoles(req.user, Entity, Access.ROLE_ADMIN)
            );

            const owner_user = _.get(req, 'user._id');

            PersistenceServices(Entity)
                .update(req.params.id, bodyWithOwner, req.user)
                .then((e) => {
                    const data = {
                        "report_id": e["_id"],
                        "component": e['component'],
                        "filters": JSON.stringify(e['filters'], null, 2),
                        owner_user
                    };

                    return ReportHTTPService()
                        .create(`/reports/${e['report']}`, data);
                })
                .then(e => res.status(201).json(e))
                .catch(next);
        },

        patch(req, res, next) {
            _.defaults(req.body, Entity.defaults || {});

            const bodyWithOwner = Object.assign(
                {},
                mapRelationToObjectID(req.body, Entity.mapRelations),
                aclRoles(req.user, Entity, Access.ROLE_ADMIN)
            );

            const owner_user = _.get(req, 'user._id');

            PersistenceServices(Entity)
                .patch(req.params.id, bodyWithOwner, req.user)
                .then((e) => {
                    const data = {
                        "report_id": e["_id"],
                        "component": e['component'],
                        "filters": JSON.stringify(e['filters'], null, 2),
                        owner_user
                    };

                    return ReportHTTPService()
                        .create(`/reports/${e['report']}`, data);
                })
                .then(e => res.status(201).json(e))
                .catch(next);

        },

        remove(req, res, next) {
            PersistenceServices(Entity)
                .findOne(req.params.id, req.user, Access.ROLE_ADMIN)
                .then(validAccessEmpty)
                .then(({_id, report, msg, status}) => {
                    if (status == 'finished')
                        return ReportHTTPService().remove(`/reports/${_id}__${report}_${msg}`);
                })
                .then(() => PersistenceServices(Entity).remove(req.params.id, req.user))
                .then(e => res.status(204).json(e))
                .catch(next);
        },

        getReport(req, res, next) {
            let {query, headers} = req;

            let content = _(headers)
                .get('accept', 'application/json')
                .replace('*/*', 'application/json')
                .split(',', 1);

            if (_.isArray(content))
                content = _.head(content);

            query = jsonParser(query, 'query');
            query['query'] = _.head(regexFilterQuery(_.get(query, 'query')));
            const params = _.pick(query, ['limit', 'page', 'query', 'orderBy', 'ascending']);

            PersistenceServices(Entity)
                .findOne(req.params.id, req.user, Access.ROLE_READ)
                .then(validAccessEmpty)
                .then((e) => {
                    const {_id, report, msg} = e;
                    const namet = `${_id}__${report}_${msg}`;

                    return ReportHTTPService({'Accept': content})
                        .find(`/reports/${namet}`, {params});
                })
                .then(e => res.set('Content-Type', content).send(e))
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
