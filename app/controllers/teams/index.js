'use strict';

import TeamService from '../../services/teamsService';

import authenticate from '../../middlewares/authenticate';

module.exports = function (router) {

    router
        .get('/', authenticate(), function (req, res, next) {

            TeamService.find(req.query, req.user)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .get('/:id', authenticate(), function (req, res, next) {

            TeamService.findOne(req.params.id)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .put('/:id', authenticate(), function (req, res, next) {

            TeamService.update(req.params.id, req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(function(e) {
                    next(e);
                });

        })


        .delete('/:id', authenticate(), function (req, res, next) {

            TeamService.remove(req.params.id)
                .then(e => res.status(204).json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .post('/', authenticate(), function (req, res, next) {

            TeamService.create(req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(function(e) {
                    next(e);
                });

        });

    /**
     *
     * Members
     */
    router
        .get('/:id/members', authenticate(), function (req, res, next) {

            TeamService.getMembers(req.params.id, req.user)
                .then(e => res.status(201).json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .post('/:id/members', authenticate(), function (req, res, next) {

            TeamService.addMember(req.params.id, req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .delete('/:id/members', authenticate(), function (req, res, next) {

            TeamService.deleteMember(req.params.id, req.user)
                .then(e => res.status(201).json(e))
                .catch(function(e) {
                    next(e);
                });

        });

};
