'use strict';

const TeamService = require('../../services/teamsService');
const ProjectsService = require('../../services/projectsService');

const ArchitecturesTeamService = require('../../services/architecturesTeamService');
const ApplicationTeamService = require('../../services/applicationsTeamService');


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

            ArchitecturesTeamService.findTeamArchitectures(req.params.id, req.query, req.user)
                .then(e => res.json(e))
                .catch(function (e) {
                    next(e);
                });

        })

        .get('/:id/architectures/:idu', authenticate(), function (req, res, next) {

            ArchitecturesTeamService.findOneTeamArchitectures(req.params.id, req.params.idu, req.query, req.user)
                .then(e => res.json(e))
                .catch(function (e) {
                    next(e);
                });

        })

        .patch('/:id/architectures/:idu', authenticate(), function (req, res, next) {

            ArchitecturesTeamService.updateTeamArchitectures(req.params.id, req.params.idu, req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(function (e) {
                    next(e);
                });
        })

        .delete('/:id/architectures/:idu', authenticate(), function (req, res, next) {

            ArchitecturesTeamService.deleteTeamArchitectures(req.params.id, req.params.idu, req.user)
                .then(e => res.status(204).json(e))
                .catch(function (e) {
                    next(e);
                });

        })

        .post('/:id/architectures', authenticate(), function (req, res, next) {

            req.user._refs = "teams";

            ArchitecturesTeamService.createTeamArchitectures(req.params.id, req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(function (e) {
                    next(e);
                });
        })

        /**
         * Roles
         */

        .post('/:id/architectures/:idu/roles', authenticate(), function (req, res, next) {


            ArchitecturesTeamService.addRolesTeamArchitectures(req.params.id, req.params.idu, req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(function (e) {
                    next(e);
                });
        })

        .patch('/:id/architectures/:idu/roles/:ida', authenticate(), function (req, res, next) {

            ArchitecturesTeamService.updateRolesTeamArchitectures(req.params.id, req.params.idu, req.params.ida, req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(function (e) {
                    next(e);
                });
        })

        .delete('/:id/architectures/:idu/roles/:ida', authenticate(), function (req, res, next) {

            ArchitecturesTeamService.deleteRolesTeamArchitectures(req.params.id, req.params.idu, req.params.ida, req.user)
                .then(e => res.status(204).json(e))
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

              ApplicationTeamService.findTeamApplication(req.params.id, req.query, req.user)
                  .then(e => res.json(e))
                  .catch(function (e) {
                      next(e);
                  });

          })

          .get('/:id/applications/:idu', authenticate(), function (req, res, next) {

              ApplicationTeamService.findOneTeamApplication(req.params.id, req.params.idu, req.query, req.user)
                  .then(e => res.json(e))
                  .catch(function (e) {
                      next(e);
                  });

          })

          .patch('/:id/applications/:idu', authenticate(), function (req, res, next) {

              ApplicationTeamService.updateTeamApplication(req.params.id, req.params.idu, req.body, req.user)
                  .then(e => res.status(201).json(e))
                  .catch(function (e) {
                      next(e);
                  });
          })

          .delete('/:id/applications/:idu', authenticate(), function (req, res, next) {

              ApplicationTeamService.deleteTeamApplication(req.params.id, req.params.idu, req.user)
                  .then(e => res.status(204).json(e))
                  .catch(function (e) {
                      next(e);
                  });

          })

        .post('/:id/applications', authenticate(), function (req, res, next) {

            ApplicationTeamService.createTeamApplication(req.params.id, req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(function (e) {
                    next(e);
                });
        })

        /**
         * Roles
         */

        .post('/:id/applications/:idu/roles', authenticate(), function (req, res, next) {


            ApplicationTeamService.addRolesTeamApplication(req.params.id, req.params.idu, req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(function (e) {
                    next(e);
                });
        })

        .patch('/:id/applications/:idu/roles/:ida', authenticate(), function (req, res, next) {

            ApplicationTeamService.updateRolesTeamApplication(req.params.id, req.params.idu, req.params.ida, req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(function (e) {
                    next(e);
                });
        })

        .delete('/:id/applications/:idu/roles/:ida', authenticate(), function (req, res, next) {

            ApplicationTeamService.deleteRolesTeamApplication(req.params.id, req.params.idu, req.params.ida, req.user)
                .then(e => res.status(204).json(e))
                .catch(function (e) {
                    next(e);
                });

        });

};
