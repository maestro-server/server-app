/*global describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


let kraken = require('kraken-js'),
    path = require('path'),
    request = require('supertest');


describe('e2e - server up', function () {

    let app, mock;


    before(function (done) {
        require('dotenv').config({path: '.env.test'});
        app = require('../../app/app');

        app.use(kraken({
            basedir: path.resolve(__dirname, '../../app/')
        }));

        app.once('start', done);
        mock = app.listen(1336);
    });


    it('Welcome msg', function (done) {
        request(mock)
            .get('/')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/Maestro\ Server/)
            .end(function (err) {
                if (err) return done(err);
                done(err);
            });
    });

});
