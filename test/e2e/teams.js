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

    let teams = [{
        name: "MyTeam",
        email: "maestro@team.com"
    }, {
        name: "SecondTeam",
        email: "second@team.com",
        url: "http://maestroserver.io"
    }];


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


    describe('e2e teams: create new user', function () {
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

    describe('e2e teams: get token', function () {
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

    describe('e2e teams: create team', function () {
        it('Create team - create team', function (done) {
            request(mock)
                .post('/teams')
                .send(teams[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/MyTeam/)
                .expect(/maestro@team\.com/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Create team - create second team', function (done) {
            request(mock)
                .post('/teams')
                .send(teams[1])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .expect(/url/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Create team - validate fail', function (done) {
            request(mock)
                .post('/teams')
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .expect('Content-Type', /json/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('e2e teams: read team', function () {
        it('Exist team - list my team', function (done) {
            request(mock)
                .get('/teams')
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"MyTeam\"/)
                .expect(/maestro@team\.com/)
                .expect(/_id/)
                .expect(function(res) {
                    expect(res.body.items).to.have.length(2);
                })
                .expect(function(res) {
                    Object.assign(teams[0], res.body.items[0]);
                    Object.assign(teams[1], res.body.items[1]);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team - list my team without token', function (done) {
            request(mock)
                .get('/teams')
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team - list my team with filter', function (done) {
            request(mock)
                .get('/teams')
                .query({name: teams[0].name})
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/name"/)
                .expect(/url/)
                .expect(/_id/)
                .expect(function(res) {
                    expect(res.body.items).to.have.length(1);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team - see my new team', function (done) {
            request(mock)
                .get('/teams/'+teams[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .expect(/email/)
                .expect(/url/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team -  autocomplete', function (done) {
            request(mock)
                .get('/teams/autocomplete')
                .query({complete: "second"})
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/name"/)
                .expect(/url/)
                .expect(/_id/)
                .expect(function(res) {
                    expect(res.body.items).to.have.length(1);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

});
