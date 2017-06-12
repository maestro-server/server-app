'use strict';

const TeamService = require('services/teamsService');
const ProjectsService = require('services/projectsService');

const ArchitecturesTeamService = require('services/architecturesTeamService');
const ApplicationTeamService = require('services/applicationsTeamService');


const authenticate = require('middlewares/authenticate');

const app = require('../application/');

module.exports = function (router) {

  /**
   * @api {get} /teams/:id Get list of yours teams
   * @apiName Get Teams
   * @apiGroup Teams
   *
   * @apiParam (Query) {String} [email] Filter by email.
   * @apiParam (Query) {String} [name] Filter by name.
   * @apiParam (Query) {String} [url] Filter by url.
   *
   * @apiPermission JWT
   * @apiHeader (Auth) {String} Authorization JWT {Token}
   *
   * @apiError (Error) Unauthorized Invalid Token
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "firstname": "John",
   *       "lastname": "Doe"
   *     }
   */
    router
        .get('/', authenticate(), app.list)

        .get('/upload', authenticate(), function (req, res, next) {

            TeamService.uploadAvatar(req.query, req.user)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });
        })
        /**
         * @api {get} /teams/:id Get team information
         * @apiName Get Single Team
         * @apiGroup Teams
         *
         * @apiParam (Param) {String} id Teams unique ID.
         *
         * @apiPermission JWT
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token dont have permission
         * @apiError (Error) Unauthorized Invalid Token
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *       "firstname": "John",
         *       "lastname": "Doe"
         *     }
         */
        .get('/:id', authenticate(), app.single)

        .patch('/:id', authenticate(), app.update)

        /**
         * @api {delete} /teams/:id Delete team
         * @apiName Delete Single Team
         * @apiGroup Teams
         *
         * @apiParam (Param) {String} id Teams unique ID.
         *
         * @apiPermission JWT
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token dont have permission
         * @apiError (Error) Unauthorized Invalid Token
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 204 OK
         */
        .delete('/:id', authenticate(), app.delete)

        .post('/', authenticate(), app.create);

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

        .put('/:id/members/:idu', authenticate(), function (req, res, next) {

            TeamService.updateMember(req.params.id, req.params.idu, req.body, req.user)
                .then(e => res.status(201).json(e))
                .catch(function (e) {
                    next(e);
                });

        })
        /**
         * @api {delete} /teams/:id/members/:idu Delete member team
         * @apiName Delete Single Member of Team
         * @apiGroup Teams
         *
         * @apiParam (Param) {String} id Teams unique ID.
         * @apiParam (Param) {String} id Member unique ID.
         *
         * @apiPermission JWT
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token dont have permission
         * @apiError (Error) Unauthorized Invalid Token
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 204 OK
         */
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
        /**
         * @api {delete} /teams/:id/projects/:idu Delete project team
         * @apiName Delete Single Project of Team
         * @apiGroup Teams
         *
         * @apiParam (Param) {String} id Teams unique ID.
         * @apiParam (Param) {String} idu Project unique ID.
         *
         * @apiPermission JWT
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token dont have permission
         * @apiError (Error) Unauthorized Invalid Token
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 204 OK
         */
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
        /**
         * @api {delete} /teams/:id/architectures/:idu Delete architectures team
         * @apiName Delete Single Architectures of Team
         * @apiGroup Teams
         *
         * @apiParam (Param) {String} id Teams unique ID.
         * @apiParam (Param) {String} idu Member unique ID.
         *
         * @apiPermission JWT
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token dont have permission
         * @apiError (Error) Unauthorized Invalid Token
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 204 OK
         */
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
        /**
         * @api {delete} /teams/:id/architectures/:idu/roles/:ida Delete role architectures team
         * @apiName Delete Role of architectures team
         * @apiGroup Teams
         *
         * @apiParam (Param) {String} id Teams unique ID.
         * @apiParam (Param) {String} idu Architecture unique ID.
         * @apiParam (Param) {String} ida Role unique ID.
         *
         * @apiPermission JWT
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token dont have permission
         * @apiError (Error) Unauthorized Invalid Token
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 204 OK
         */
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
          /**
           * @api {delete} /teams/:id/applications/:idu Delete application of team
           * @apiName Delete Single application of Team
           * @apiGroup Teams
           *
           * @apiParam (Param) {String} id Team unique ID.
           * @apiParam (Param) {String} idu Application unique ID.
           *
           * @apiPermission JWT
           * @apiHeader (Auth) {String} Authorization JWT {Token}
           *
           * @apiError (Error) PermissionError Token dont have permission
           * @apiError (Error) Unauthorized Invalid Token
           *
           * @apiSuccessExample {json} Success-Response:
           *     HTTP/1.1 204 OK
           */
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
        /**
         * @api {delete} /teams/:id/projects/:idu Delete role of application team
         * @apiName Delete Role of application Team
         * @apiGroup Teams
         *
         * @apiParam (Param) {String} id Teams unique ID.
         * @apiParam (Param) {String} idu Application unique ID.
         * @apiParam (Param) {String} ida Role unique ID.
         *
         * @apiPermission JWT
         * @apiHeader (Auth) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token dont have permission
         * @apiError (Error) Unauthorized Invalid Token
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 204 OK
         */
        .delete('/:id/applications/:idu/roles/:ida', authenticate(), function (req, res, next) {

            ApplicationTeamService.deleteRolesTeamApplication(req.params.id, req.params.idu, req.params.ida, req.user)
                .then(e => res.status(204).json(e))
                .catch(function (e) {
                    next(e);
                });

        });

};
