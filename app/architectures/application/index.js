'use strict';

const Arch = require('services/architecturesService');

const PersistenceServices = require('services/PersistenceServices');
const Architecture = require('../entities/Architecture');


module.exports = {

    list: (req, res, next) => {

        PersistenceServices(Architecture)
            .find(req.query, req.user)
            .then(e => res.json(e))
            .catch(function(e) {
                next(e);
            });
    },

    single: (req, res, next) => {
        Arch.findOne(req.params.id, req.user)
            .then(e => res.json(e))
            .catch(function(e) {
                next(e);
            });

    },

    update: (req, res, next) => {
        Arch.update(req.params.id, req.body, req.user)
            .then(e => res.status(202).json(e))
            .catch(function(e) {
                next(e);
            });

    },

    create: (req, res, next) => {
        req.user._refs = "users";

        Arch.create(req.body, req.user)
            .then(e => res.status(201).json(e))
            .catch(function(e) {
                next(e);
            });
    },

    delete: (req, res, next) => {
        Arch.remove(req.params.id, req.user)
            .then(e => res.status(204).json(e))
            .catch(function(e) {
                next(e);
            });
    }

}
