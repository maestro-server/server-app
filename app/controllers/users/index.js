'use strict';

import UserService from '../../services/usersService';


module.exports = function (router) {

    router

        .get('/', function (req, res) {

            res.send("get user ");

        })

        .get('/:id', function (req, res) {

            res.send("get user id ");

        })

        .put('/:id', function (req, res) {

            res.send("put user id ");

        })


        .delete('/:id', function (req, res) {

            res.send("delete user id ");

        });


    router.post('/', function (req, res, next) {

        UserService.create(req.body)
            .then(e => res.status(201).json(e))
            .catch(function(e) {
                next(e);
            });

    });

};
