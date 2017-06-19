'use strict';
require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    request = require('supertest'),
    cleaner_db = require('./libs/cleaner_db'),
    {expect} = chai;

describe('e2e applications', function () {
    let app, mock;

    let user = {
        name: "MaestroUsers",
        email: "maestro@maestrousers.com",
        newemail: "mynew@mail.com",
        password: "mytester",
        token: null,
        _id: null
    };

    let friend = {
        name: "Friend",
        email: "friend@maestrousers.com",
        password: "mytester",
        token: null,
        _id: null
    };

    let applications = [{
        name: "MyApplication"
    }, {
        name: "SecondApplication"
    }];

    const conn = process.env.MONGO_URL+'_app';
    before(function (done) {
      app = require('./libs/bootApp')(conn);

      app.once('start', done);
      mock = app.listen(1340);
    });

    after(function (done) {
      cleaner_db([{tb: 'users'}, {tb: 'applications'}, {tb: 'teams'}], done, mock, conn);
    });


    describe('create new user', function () {
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

        it('Create account - success friend', function (done) {
            request(mock)
                .post('/users')
                .send(friend)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"Friend\"/)
                .expect(/_id/)
                .expect((res) => {
                    friend._id = res.body._id;
                })
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


    /*
---------------------------------------------------------- team app
    */

    let teamsAPP = [{
        name: "MyApplication"
    }, {
        name: "SecondApplication"
    }];

    let teams = {
      name: "MyTeam",
      _id: null
    };
    /**
    *
    * Create application
    * @depends create user
    * @description I like to create a new application
    */
    describe('create team', function () {
      it('Create team', function (done) {
          request(mock)
              .post('/teams')
              .send(teams)
              .set('Authorization', `JWT ${user.token}`)
              .expect(201)
              .expect('Content-Type', /json/)
              .expect(/MyTeam/)
              .expect(/_id/)
              .expect((res) => {
                  teams._id = res.body._id;
              })
              .end(function (err) {
                  if (err) return done(err);
                  done(err);
              });
      });
    });

    describe('create team application', function () {
        it('Create team application - create team application', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/applications`)
                .send(teamsAPP[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect(e=>console.log(e.body))
                .expect('Content-Type', /json/)
                .expect(/MyApplication/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


        it('Create team application - create second application', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/applications`)
                .send(teamsAPP[1])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

    });


});
