/*global describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


let kraken = require('kraken-js'),
    path = require('path'),
    request = require('supertest'),
    cleaner_db = require('./libs/cleaner_db');


describe('e2e auth: auth and login', function () {

    let app, mock;

    let user = {
        name: "MaestroTester",
        email: "maestro@maestrotester.com",
        password: "mytester",
        token: null
    };


    before(function (done) {
        require('dotenv').config({path: '.env.test'});
        app = require('../../app/app');

        app.use(kraken({
            basedir: path.resolve(__dirname, '../../app/')
        }));

        app.once('start', done);
        mock = app.listen(1339);
    });


    after(function (done) {
        cleaner_db('users', done, mock);
    });


    describe('e2e auth: create new user', function () {
        it('Create account - success', function (done) {
            request(mock)
                .post('/users')
                .send(user)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"MaestroTester\"/)
                .expect(/maestro@maestrotester\.com/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Create account - validation all data', function (done) {
            request(mock)
                .post('/users')
                .expect(422)
                .expect('Content-Type', /json/)
                .expect(/ValidatorError/)
                .expect(/name/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Create account - validation email', function (done) {
            request(mock)
                .post('/users')
                .send({name: "MyName", email: "isnotemail"})
                .expect(422)
                .expect('Content-Type', /json/)
                .expect(/ValidatorError/)
                .expect(/email/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('e2e auth: exist user, test conflict creation and login', function () {
        // test depends: create user
        it('Exist account - conflict', function (done) {
            request(mock)
                .post('/users')
                .send(user)
                .expect(409)
                .expect('Content-Type', /json/)
                .expect(/Conflict/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist account - right login', function (done) {
            request(mock)
                .post('/users/auth')
                .send(user)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/token/)
                .expect(/maestro@maestrotester\.com/)
                .expect(/_id/)
                .expect((res) => {
                    user.token = res.body.token;
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist account - wrong login', function (done) {
            const wrong = Object.assign(user, {password: "wrongpass"});

            request(mock)
                .post('/users/auth')
                .send(wrong)
                .expect(400)
                .expect('Content-Type', /json/)
                .expect(/PermissionError/)
                .expect(/Invalid/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('e2e auth: exist user, test token', function () {
        // test depends: right login
        it('Exist account - valid token', function (done) {
            request(mock)
                .get('/me')
                .set('Authorization', `JWT ${user.token}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(/_id"/)
                .expect(/email"/)
                .expect(/name"/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist account - invalid token', function (done) {
            request(mock)
                .get('/me')
                .set('Authorization', `JWT ${user.token}a`)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });
});
