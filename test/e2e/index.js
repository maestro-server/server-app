'use strict';
require('dotenv').config({path: '.env.test'});

let request = require('supertest');


describe('e2e - server up', function () {

    let app, mock;


    before(function (done) {
        app = require('./libs/bootApp')();

        app.once('start', done);
        mock = app.listen(1343);
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
