'use strict';

// demo populate, connect on real env, carefull

require('dotenv').config({path: '.env'});

let chai = require('chai'),
    request = require('supertest'),
    cleaner_db = require('../e2e/libs/cleaner_db'),
    {expect} = chai,
    _ = require('lodash');


describe('demo setup', function () {

    let app, mock;


    before(function (done) {
      cleaner_db([{tb: 'users'}, {tb: 'clients'}], () => {
        app = require('../e2e/libs/bootApp')();

        app.once('start', done);
        mock = app.listen(1341);
      }, null);
    });

    after(function (done) {
      mock.close(done);
    });


    describe('create new user', function () {
        it('Create account - success', function (done) {
            request(mock)
                .post('/users')
                .send(user)
                .expect(201)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

    });

    describe('get token', function () {
        it('Exist user - get my token', function (done) {
            request(mock)
                .post('/users/auth')
                .send(user)
                .expect(200)
                .expect((res) => {
                    user.token = res.body.token;
                    user._id = res.body.user._id;
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });



});
