'use strict';

const DAccessServices = require('core/services/AccessServices');
const collectionRefsTransform = require('./transforms/collectionRefsTransform');

const AccessApp = (Entity, AccessServices=DAccessServices) => {

    return {

      update: (req, res, next) => {

        AccessServices(Entity)
            .updateRoles(req.params.id, req.params.idu, req.body, req.user)
            .then((e) => {
                return collectionRefsTransform([e], req.params.id, Entity.name);
            })
            .then(e => res.status(201).json(e))
            .catch(function (e) {
                next(e);
            });
      },

      create: (req, res, next) => {

          AccessServices(Entity)
              .addRoles(req.params.id, req.body, req.user)
              .then((e) => {
                  return collectionRefsTransform([e], req.params.id, Entity.name);
              })
              .then(e => res.status(201).json(e))
              .catch(function (e) {
                  next(e);
              });
      },

      delete: (req, res, next) => {

          AccessServices(Entity)
              .deleteRoles(req.params.id, req.params.idu, req.user)
              .then(e => res.status(204).json(e))
              .catch(function (e) {
                  next(e);
              });
      }

    };
};

module.exports = AccessApp;
