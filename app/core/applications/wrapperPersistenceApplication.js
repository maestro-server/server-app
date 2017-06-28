'use strict';

const _ = require('lodash');
const Access = require('core/entities/accessRole');

const DFactoryPesistenceApp = require('core/applications/persistenceApplication');
const PersistenceServices = require('core/services/PersistenceServices');

const notExist = require('core/applications/validator/validNotExist');


const WrapperPersistenceApp = (Entity) => (ACEntity) => (FactoryPesistenceApp = DFactoryPesistenceApp) => {

    const PesistenceApp = FactoryPesistenceApp(Entity);

    return {
        find (req, res, next) {
            const {user, params} = req;

            PersistenceServices(ACEntity)
                .findOne(params.id, user, Access.ROLE_READ)
                .then(notExist)
                .then((e) => {
                    e.refs = ACEntity.name;
                    req.user = _.pick(e, 'name', 'email', '_id', 'refs');

                    PesistenceApp.find(req, res, next);
                })
                .catch((err) => {
                    next(err);
                });
        },

        findOne (req, res, next) {
            const {user, params} = req;

            PersistenceServices(ACEntity)
                .findOne(params.id, user, Access.ROLE_READ)
                .then(notExist)
                .then((e) => {
                    e.refs = ACEntity.name;
                    req.user = _.pick(e, 'name', 'email', '_id', 'refs');
                    req.params.id = _.get(params, 'idu');

                    PesistenceApp.findOne(req, res, next);
                })
                .catch((err) => {
                    next(err);
                });
        },

        update (req, res, next) {
            const {user, params} = req;

            PersistenceServices(ACEntity)
                .findOne(params.id, user, Access.ROLE_WRITER)
                .then(notExist)
                .then((e) => {
                    e.refs = ACEntity.name;
                    req.user = _.pick(e, 'name', 'email', '_id', 'refs');
                    req.params.id = _.get(params, 'idu');
                    req.params.idu = _.get(params, 'ida');

                    PesistenceApp.update(req, res, next);
                })
                .catch((err) => {
                    next(err);
                });
        },

        create (req, res, next) {
            const {user, params} = req;

            PersistenceServices(ACEntity)
                .findOne(params.id, user, Access.ROLE_WRITER)
                .then(notExist)
                .then((e) => {
                    e.refs = ACEntity.name;
                    req.user = _.pick(e, 'name', 'email', '_id', 'refs');
                    req.params.id = _.get(params, 'idu');

                    PesistenceApp.create(req, res, next);
                })
                .catch((err) => {
                    next(err);
                });
        },

        remove (req, res, next) {
            const {user, params} = req;

            PersistenceServices(ACEntity)
                .findOne(params.id, user, Access.ROLE_WRITER)
                .then(notExist)
                .then((e) => {
                    e.refs = ACEntity.name;
                    req.user = _.pick(e, 'name', 'email', '_id', 'refs');
                    req.params.id = _.get(params, 'idu');
                    req.params.idu = _.get(params, 'ida');

                    PesistenceApp.remove(req, res, next);
                })
                .catch((err) => {
                    next(err);
                });
        }
    };

};


module.exports = WrapperPersistenceApp;
