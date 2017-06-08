'use strict';

const RolesServices = require('services/RolesServices');

module.exports = {

    update: (req, res, next) => {

        ApplicationsService.updateRoles(req.params.id, req.params.idu, req.body, req.user)
            .then(e => res.status(201).json(e))
            .catch(function (e) {
                next(e);
            });

    },

    create: (req, res, next) => {
        ApplicationsService.addRoles(req.params.id, req.body, req.user)
            .then(e => res.status(201).json(e))
            .catch(function (e) {
                next(e);
            });
    },

    delete: (req, res, next) => {
        ApplicationsService.deleteRoles(req.params.id, req.params.idu, req.user)
            .then(e => res.status(204).json(e))
            .catch(function (e) {
                next(e);
            });
    }

}
