'use strict';

const _ = require('lodash');

const DDepServices = require('inventory/services/DependenciesServices');

const DepsApp = (Entity, DepServices = DDepServices) => {

    const field = 'deps';

    return {

        create: (req, res, next) => {

            DepServices(Entity, field)
                .addDep(req.params.id, req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(next);
        },

        updateSingle: (req, res, next) => {

            DepServices(Entity, field)
                .updateSingleDep(req.params.id, req.params.idu, req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(next);
        },

        remove: (req, res, next) => {

            DepServices(Entity, field)
                .deleteDep(req.params.id, req.params.idu, req.user)
                .then(e => res.status(204).json(e))
                .catch(next);
        }

    };
};

module.exports = _.curry(DepsApp);
