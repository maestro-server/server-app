'use strict';

const Access = require('core/entities/accessRole');

const DFactoryPesistenceApp = require('core/applications/persistenceApplication');
const PersistenceServices = require('core/services/PersistenceServices');

const notExist = require('core/applications/validator/validNotExist');
const changerUser = require('./transforms/swapUser');


const WrapperPersistenceApp = (Entity) => (ACEntity) => (FactoryPesistenceApp = DFactoryPesistenceApp) => {

    const PesistenceApp = FactoryPesistenceApp(Entity);

    return {
        find (req, res, next) {
            const {user, params} = req;

            PersistenceServices(ACEntity)
                .findOne(params.id, user, Access.ROLE_READ)
                .then(notExist)
                .then((e) => {
                    const newReq = changerUser(req, e, params, ACEntity);
                    PesistenceApp.find(newReq, res, next);
                })
                .catch(next);
        },

        findOne (req, res, next) {
            const {user, params} = req;

            PersistenceServices(ACEntity)
                .findOne(params.id, user, Access.ROLE_READ)
                .then(notExist)
                .then((e) => {
                    const newReq = changerUser(req, e, params, ACEntity);
                    PesistenceApp.findOne(newReq, res, next);
                })
                .catch(next);
        },

        update (req, res, next) {
            const {user, params} = req;

            PersistenceServices(ACEntity)
                .findOne(params.id, user, Access.ROLE_WRITER)
                .then(notExist)
                .then((e) => {
                    const newReq = changerUser(req, e, params, ACEntity);
                    PesistenceApp.update(newReq, res, next);
                })
                .catch(next);
        },

        patch (req, res, next) {
            const {user, params} = req;

            PersistenceServices(ACEntity)
                .findOne(params.id, user, Access.ROLE_WRITER)
                .then(notExist)
                .then((e) => {
                    const newReq = changerUser(req, e, params, ACEntity);
                    PesistenceApp.patch(newReq, res, next);
                })
                .catch(next);
        },

        create (req, res, next) {
            const {user, params} = req;

            PersistenceServices(ACEntity)
                .findOne(params.id, user, Access.ROLE_WRITER)
                .then(notExist)
                .then((e) => {
                    const newReq = changerUser(req, e, params, ACEntity);
                    PesistenceApp.create(newReq, res, next);
                })
                .catch(next);
        },

        remove (req, res, next) {
            const {user, params} = req;

            PersistenceServices(ACEntity)
                .findOne(params.id, user, Access.ROLE_WRITER)
                .then(notExist)
                .then((e) => {
                    const newReq = changerUser(req, e, params, ACEntity);
                    PesistenceApp.remove(newReq, res, next);
                })
                .catch(next);
        }
    };

};


module.exports = WrapperPersistenceApp;
