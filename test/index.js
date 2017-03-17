/*global describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


var kraken = require('kraken-js'),
    express = require('express'),
    path = require('path'),
    request = require('supertest');


describe('index', function () {

    var app, mock;


    beforeEach(function (done) {
        app = express();
        app.on('start', done);


        app.use(kraken({
            basedir: path.resolve(__dirname, '../app/')
        }));

        mock = app.listen(1337);

    });


    afterEach(function (done) {
        mock.close(done);
    });


    it('should have model name "index"', function (done) {
        request(mock)
            .get('/')
            .expect(200)
            .expect('Content-Type', /html/)

                .expect("ok")

            .end(function (err, res) {
                done(err);
            });
    });

});
