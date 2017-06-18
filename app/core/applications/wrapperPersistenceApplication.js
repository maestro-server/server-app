'use strict';

const _ = require('lodash');
const Access = require('core/entities/accessRole');

const FactoryPesistenceApp = require('core/applications/persistenceApplication');
const PersistenceServices = require('core/services/PersistenceServices');

const accessEmpty = require('core/validators/accessEmpty');


const WrapperAccessPersistenceApp = (Entity, Team) => {

    const PesistenceApp = FactoryPesistenceApp(Entity);

    return {

        find (req, res, next) {
            const {user, params} = req;

            PersistenceServices(Team)
                .findOne(params.id, user, Access.ROLE_READ)
                .then(accessEmpty)
                .then((e) => {
                    e.refs = Team.name;
                    req.user = _.pick(e, 'name', 'email', '_id', 'refs');

                    PesistenceApp.find(req, res, next);
                })
                .catch((err) => {
                    next(err);
                });
        },

        findOne (req, res, next) {
            const {user, params} = req;

            PersistenceServices(Team)
                .findOne(params.id, user, Access.ROLE_READ)
                .then(accessEmpty)
                .then((e) => {
                    e.refs = Team.name;
                    req.user = _.pick(e, 'name', 'email', '_id', 'refs');
                    req.params.id = req.params.idu;

                    PesistenceApp.findOne(req, res, next);
                })
                .catch((err) => {
                    next(err);
                });
        },

        update (req, res, next) {
            const {user, params} = req;

            PersistenceServices(Team)
                .findOne(params.id, user, Access.ROLE_WRITER)
                .then(accessEmpty)
                .then((e) => {
                    e.refs = Team.name;
                    req.user = _.pick(e, 'name', 'email', '_id', 'refs');
                    req.params.id = req.params.idu;

                    PesistenceApp.update(req, res, next);
                })
                .catch((err) => {
                    next(err);
                });
        },

        create (req, res, next) {
            const {user, params} = req;

            PersistenceServices(Team)
                .findOne(params.id, user, Access.ROLE_WRITER)
                .then(accessEmpty)
                .then((e) => {
                    e.refs = Team.name;
                    req.user = _.pick(e, 'name', 'email', '_id', 'refs');

                    PesistenceApp.create(req, res, next);
                })
                .catch((err) => {
                    next(err);
                });
        },

        remove (req, res, next) {
            const {user, params} = req;

            PersistenceServices(Team)
                .findOne(params.id, user, Access.ROLE_WRITER)
                .then(accessEmpty)
                .then((e) => {
                    e.refs = Team.name;
                    req.user = _.pick(e, 'name', 'email', '_id', 'refs');
                    req.params.id = req.params.idu;

                    PesistenceApp.remove(req, res, next);
                })
                .catch((err) => {
                    next(err);
                });
        }

    };
};

module.exports = WrapperAccessPersistenceApp;
