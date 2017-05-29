'use strict';

const UserService = require('../../services/usersService');
const authenticate = require('../../middlewares/authenticate');


module.exports = function (router) {

    router
        .get('/', authenticate(), function (req, res, next) {

            UserService.findOne(req.user._id)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .put('/', authenticate(), function (req, res, next) {

            UserService.update(req.user._id, req.body)
                .then(e => res.status(201).json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .delete('/', authenticate(), function (req, res, next) {

            UserService.remove(req.user._id)
                .then(e => res.status(204).json(e))
                .catch(function(e) {
                    next(e);
                });

        });



};
