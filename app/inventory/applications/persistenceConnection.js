'use strict';

const _ = require('lodash');

const hateaosTransform = require('core/applications/transforms/hateoasTransform');
const DPersistenceServices = require('core/services/PersistenceServices');
const aclRoles = require('core/applications/transforms/aclRoles');
const tokenGenerator = require('../transforms/tokenTransform');
const Access = require('core/entities/accessRole');
const notExist = require('core/applications/validator/validNotExist');

const {DiscoveryHTTPService} = require('core/services/HTTPService');

const Datacenter = require('..//entities/Datacenter');

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

            const dc_id = _.get(req, 'body.dc_id')
            if (dc_id) {
                PersistenceServices(Datacenter).patch(dc_id, {'sucessed': true}, req.user);
            }

            PersistenceServices(Entity)
                .create(bodyWithOwner)
                .then(hateaosTransform(Entity).singleTransform)
                .then(e => res.status(201).json(e))
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
