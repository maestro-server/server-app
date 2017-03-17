'use strict';


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


    router.post('/', function (req, res) {

        res.send("posdt users");

    });

};
