/*global describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


let kraken = require('kraken-js'),
    express = require('express'),
    path = require('path'),
    request = require('supertest');


describe('e2e - server up', function () {

    let app, mock;


    before(function (done) {
        require('dotenv').config();
        process.env.NODE_ENV = 'test';

        app = express();

        app.use(kraken({
            basedir: path.resolve(__dirname, '../app/')
        }));

        app.once('start', done);
        mock = app.listen(1337);
    });


    after(function (done) {
        mock.close(done);
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
