'use strict';

import TeamService from '../../services/teamsService';
import ProjectsService from '../../services/projectsService';

import ArchitecturesService from '../../services/architecturesService';
import ApplicationsService from '../../services/applicationsService';

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

            TeamService.findOne(req.params.id, req.user)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .patch('/:id', authenticate(), function (req, res, next) {

            TeamService.update(req.params.id, req.body, req.user)
                .then(e => res.status(202).json(e))
                .catch(function(e) {
                    next(e);
                });

        })


        .delete('/:id', authenticate(), function (req, res, next) {

            TeamService.remove(req.params.id, req.user)
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
                .then(e => res.json(e))
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

        .delete('/:id/members/:idu', authenticate(), function (req, res, next) {

            TeamService.deleteMember(req.params.id, req.params.idu, req.user)
                .then(e => res.status(204).json(e))
                .catch(function(e) {
                    next(e);
                });

        });


    /**
     *
     * Projects
     */
    router
        .get('/:id/projects', authenticate(), function (req, res, next) {

            ProjectsService.findTeamProject(req.params.id, req.query, req.user)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .get('/:id/projects/:idu', authenticate(), function (req, res, next) {

            ProjectsService.findOneTeamProject(req.params.id, req.params.idu, req.query, req.user)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        })

        .post('/:id/projects', authenticate(), function (req, res, next) {

            ProjectsService.createTeamProject(req.params.id, req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(function(e) {
                    next(e);
                });
        })

        .patch('/:id/projects/:idu', authenticate(), function (req, res, next) {

            ProjectsService.updateTeamProject(req.params.id, req.params.idu, req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(function(e) {
                    next(e);
                });
        })

        .delete('/:id/projects/:idu', authenticate(), function (req, res, next) {

            ProjectsService.deleteTeamProject(req.params.id, req.params.idu, req.user)
                .then(e => res.status(204).json(e))
                .catch(function(e) {
                    next(e);
                });

        });



      /**
       *
       * Architectures
       */
      router
            .post('/:id/architectures', authenticate(), function (req, res, next) {

                ArchitecturesService.createTeamArchitectures(req.params.id, req.body, req.user)
                    .then(e => res.status(201).json(e))
                    .catch(function(e) {
                        next(e);
                    });
            });


      /**
       *
       * Applications
       */
      router
            .post('/:id/applications', authenticate(), function (req, res, next) {

                ApplicationsService.createTeamApplication(req.params.id, req.body, req.user)
                    .then(e => res.status(201).json(e))
                    .catch(function(e) {
                        next(e);
                    });
            });

};
