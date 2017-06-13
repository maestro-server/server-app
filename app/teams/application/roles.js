'use strict';

const RolesServices = require('core/services/RolesServices');
const ArchitecturesService = require('core/services/architecturesService');

module.exports = {

    update: (req, res, next) => {

        ArchitecturesService.updateRoles(req.params.id, req.params.idu, req.body, req.user)
            .then(e => res.status(201).json(e))
            .catch(function (e) {
                next(e);
            });

    },

    create: (req, res, next) => {
        ArchitecturesService.addRoles(req.params.id, req.body, req.user)
            .then(e => res.status(201).json(e))
            .catch(function (e) {
                next(e);
            });
    },

    delete: (req, res, next) => {
        ArchitecturesService.deleteRoles(req.params.id, req.params.idu, req.user)
            .then(e => res.status(204).json(e))
            .catch(function (e) {
                next(e);
            });
    }

}
