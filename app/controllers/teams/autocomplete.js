'use strict';

const TeamsService = require('../../services/teamsService');
const authenticate = require('../../middlewares/authenticate');


module.exports = function (router) {

    router
        .get('/', authenticate(), function (req, res, next) {

            TeamsService.autocomplete(req.query, req.user)
                .then(e => res.json(e))
                .catch(function(e) {
                    next(e);
                });

        });

};
