/*global describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


let kraken = require('kraken-js'),
    express = require('express'),
    path = require('path'),
    request = require('supertest');


describe('index', function () {

    let app, mock;

    beforeEach(function (done) {
      require('dotenv').config();
      process.env.NODE_ENV = 'test';

       app = express();

       app.use(kraken({
           basedir: path.resolve(__dirname, '../../app/')
       }));

       app.once('start', done);
       mock = app.listen(1337);
    });


    afterEach(function (done) {
        mock.close(done);
    });


    it('should have model name "index"', function (done) {
        request(mock)
            .get('/')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/Maestro/)
            .end(function (err) {
              if (err) return done(err);
              done(err);
            });
    });

});
