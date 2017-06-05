'use strict';

const ProjectsService = require('services/projectsService');
const authenticate = require('middlewares/authenticate');


module.exports = function (router) {

    router
        .get('/', authenticate(), function (req, res, next) {

            ProjectsService.autocomplete(req.query, req.user)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        });

};
