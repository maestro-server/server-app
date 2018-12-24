'use strict';

const _ = require('lodash');
const Access = require('core/entities/accessRole');
const DPersistenceServices = require('core/services/PersistenceServices');
const validAccessEmpty = require('core/applications/validator/validAccessEmpty');
const {AuditHTTPService} = require('core/services/HTTPService');

const PersistenceAudit = (Entity, PersistenceServices = DPersistenceServices) => {

    return {

        find(req, res, next) {

            const entity = Entity.name;
            const {id} = req.params;

            PersistenceServices(Entity)
                .findOne(id, req.user, Access.ROLE_READ)
                .then(validAccessEmpty)
                .then(() => {
                    return AuditHTTPService()
                        .find(`/audit/${entity}/${id}`);
                })


                .then(e => res.json(e))
                .catch(next);
        }

    };
};

module.exports = _.curry(PersistenceAudit);
