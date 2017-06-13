'use strict';

const Arch = require('core/services/architecturesService');

const PersistenceServices = require('core/services/PersistenceServices');
const User = require('../../entities/User');

module.exports = {

    list: (req, res, next) => {

        PersistenceServices(User)
            .find(req.query, req.user)
            .then(e => res.json(e))
            .catch(function (e) {
                next(e);
            });
    },

    single: (req, res, next) => {

        PersistenceServices(User)
            .findOne(req.params.id, req.user)
            .then(e => res.json(e))
            .catch(function (e) {
                next(e);
            });

    },

    update: (req, res, next) => {

        PersistenceServices(User)
            .update(req.params.id, req.body, req.user)
            .then(e => res.status(202).json(e))
            .catch(function (e) {
                next(e);
            });

    },

    create: (req, res, next) => {
        req.user._refs = "users";

        PersistenceServices(User)
            .create(req.body, req.user)
            .then(e => res.status(201).json(e))
            .catch(function (e) {
                next(e);
            });
    },

    delete: (req, res, next) => {

        PersistenceServices(User)
            .remove(req.params.id, req.user)
            .then(e => res.status(204).json(e))
            .catch(function (e) {
                next(e);
            });
    }

}
