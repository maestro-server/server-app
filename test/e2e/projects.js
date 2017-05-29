/*global describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


let kraken = require('kraken-js'),
    chai = require('chai'),
    path = require('path'),
    request = require('supertest'),
    cleaner_db = require('./libs/cleaner_db'),
    {expect} = chai;



describe('e2e users: user - create, update, delete', function () {

    let app, mock;

    let user = {
        name: "MaestroUsers",
        email: "maestro@maestrousers.com",
        newemail: "mynew@mail.com",
        password: "mytester",
        token: null,
        _id: null
    };


    before(function (done) {
        require('dotenv').config({path: '.env.test'});
        app = require('../../app/app');

        app.use(kraken({
            basedir: path.resolve(__dirname, '../../app/')
        }));

        app.once('start', done);
        mock = app.listen(1337);
    });


    after(function (done) {
        cleaner_db(done, mock);
    });


    describe('e2e users: create new user', function () {
        it('Create account - success', function (done) {
            request(mock)
                .post('/users')
                .send(user)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"MaestroUsers\"/)
                .expect(/maestro@maestrousers\.com/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('e2e users: get token', function () {
        it('Exist user - get my token', function (done) {
            request(mock)
                .post('/users/auth')
                .send(user)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"MaestroUsers\"/)
                .expect(/maestro@maestrousers\.com/)
                .expect(/_id/)
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
