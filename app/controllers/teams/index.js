'use strict';

const TeamService = require('../../services/teamsService');
const ProjectsService = require('../../services/projectsService');

const ArchitecturesService = require('../../services/architecturesService');
const ApplicationsService = require('../../services/applicationsService');

const authenticate = require('../../middlewares/authenticate');

module.exports = function (router) {

    router
        .get('/', authenticate(), function (req, res, next) {

            TeamService.find(req.query, req.user)
                .then(e => res.json(e))
                .catch(function (e) {
                    next(e);
                });

        })

        .get('/:id', authenticate(), function (req, res, next) {

            TeamService.findOne(req.params.id, req.user)
                .then(e => res.json(e))
                .catch(function (e) {
                    next(e);
                });

        })

        .patch('/:id', authenticate(), function (req, res, next) {

            TeamService.update(req.params.id, req.body, req.user)
                .then(e => res.status(202).json(e))
                .catch(function (e) {
                    next(e);
                });

        })


        .delete('/:id', authenticate(), function (req, res, next) {

            TeamService.remove(req.params.id, req.user)
                .then(e => res.status(204).json(e))
                .catch(function (e) {
                    next(e);
                });

        })

        .post('/', authenticate(), function (req, res, next) {

            TeamService.create(req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(function (e) {
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
                .catch(function (e) {
                    next(e);
                });

        })

        .post('/:id/members', authenticate(), function (req, res, next) {

            TeamService.addMember(req.params.id, req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(function (e) {
                    next(e);
                });

        })

        .patch('/:id/members/:idu', authenticate(), function (req, res, next) {

            TeamService.updateMember(req.params.id, req.params.idu, req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(function (e) {
                    next(e);
                });

        })

        .delete('/:id/members/:idu', authenticate(), function (req, res, next) {

            TeamService.deleteMember(req.params.id, req.params.idu, req.user)
                .then(e => res.status(204).json(e))
                .catch(function (e) {
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
                .catch(function (e) {
                    next(e);
                });

        })

        .get('/:id/projects/:idu', authenticate(), function (req, res, next) {

            ProjectsService.findOneTeamProject(req.params.id, req.params.idu, req.query, req.user)
                .then(e => res.json(e))
                .catch(function (e) {
                    next(e);
                });

        })

        .post('/:id/projects', authenticate(), function (req, res, next) {

            ProjectsService.createTeamProject(req.params.id, req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(function (e) {
                    next(e);
                });
        })

        .patch('/:id/projects/:idu', authenticate(), function (req, res, next) {

            ProjectsService.updateTeamProject(req.params.id, req.params.idu, req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(function (e) {
                    next(e);
                });
        })

        .delete('/:id/projects/:idu', authenticate(), function (req, res, next) {

            ProjectsService.deleteTeamProject(req.params.id, req.params.idu, req.user)
                .then(e => res.status(204).json(e))
                .catch(function (e) {
                    next(e);
                });

        });


    /**
     *
     * Architectures
     */
    router
        .get('/:id/architectures', authenticate(), function (req, res, next) {

            ArchitecturesService.findTeamArchitectures(req.params.id, req.query, req.user)
                .then(e => res.json(e))
                .catch(function (e) {
                    next(e);
                });

        })

        .get('/:id/architectures/:idu', authenticate(), function (req, res, next) {

            ArchitecturesService.findOneTeamArchitectures(req.params.id, req.params.idu, req.query, req.user)
                .then(e => res.json(e))
                .catch(function (e) {
                    next(e);
                });

        })

        .patch('/:id/architectures/:idu', authenticate(), function (req, res, next) {

            ArchitecturesService.updateTeamArchitectures(req.params.id, req.params.idu, req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(function (e) {
                    next(e);
                });
        })

        .delete('/:id/architectures/:idu', authenticate(), function (req, res, next) {

            ArchitecturesService.deleteTeamArchitectures(req.params.id, req.params.idu, req.user)
                .then(e => res.status(204).json(e))
                .catch(function (e) {
                    next(e);
                });

        })

        .post('/:id/architectures', authenticate(), function (req, res, next) {

            req.user._refs = "teams";

            ArchitecturesService.createTeamArchitectures(req.params.id, req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(function (e) {
                    next(e);
                });
        });


    /**
     *
     * Applications
     */
    router
          .get('/:id/applications', authenticate(), function (req, res, next) {

              ApplicationsService.findTeamApplication(req.params.id, req.query, req.user)
                  .then(e => res.json(e))
                  .catch(function (e) {
                      next(e);
                  });

          })

          .get('/:id/applications/:idu', authenticate(), function (req, res, next) {

              ApplicationsService.findOneTeamApplication(req.params.id, req.params.idu, req.query, req.user)
                  .then(e => res.json(e))
                  .catch(function (e) {
                      next(e);
                  });

          })

          .patch('/:id/applications/:idu', authenticate(), function (req, res, next) {

              ApplicationsService.updateTeamApplication(req.params.id, req.params.idu, req.body, req.user)
                  .then(e => res.status(201).json(e))
                  .catch(function (e) {
                      next(e);
                  });
          })

          .delete('/:id/applications/:idu', authenticate(), function (req, res, next) {

              ApplicationsService.deleteTeamApplication(req.params.id, req.params.idu, req.user)
                  .then(e => res.status(204).json(e))
                  .catch(function (e) {
                      next(e);
                  });

          })

        .post('/:id/applications', authenticate(), function (req, res, next) {

            ApplicationsService.createTeamApplication(req.params.id, req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(function (e) {
                    next(e);
                });
        });

};
