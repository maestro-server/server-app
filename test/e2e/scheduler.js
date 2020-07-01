'use strict';
require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    request = require('supertest'),
    cleaner_db = require('./libs/cleaner_db'),
    insert_adminer = require('./libs/adminer_connections'),
    {expect} = chai,
    jwt = require('jwt-simple'),
    _ = require('lodash');


describe('e2e connections', function () {

    let app, mock;

    let user = {
        name: "MaestroUsers",
        email: "maestro@maestrousers.com",
        newemail: "mynew@mail.com",
        password: "mytester",
        token: null,
        _id: null
    };


    let scheduler = [{
        name: "MySchedule",
        source: "discovery",
        endpoint: "http://teste.com",
        period_type: "interval"
    }, {
        name: "MySchedule2",
        source: "report",
        endpoint: "http://teste.com",
        period_type: "interval"
    }];

    let friend = {
        name: "Friend",
        email: "friend@maestrousers.com",
        password: "mytester",
        token: null,
        _id: null
    };

    before(function (done) {
        cleaner_db([{tb: 'users'}, {tb: 'schedulers'}], () => {
            insert_adminer(() => {
                app = require('./libs/bootApp')();
                app.once('start', done);
                mock = app.listen(1341);
            });
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

    /**
     *
     * Create Analytics
     * @depends create user
     * @description I like to create a analytics
     */
    describe('create schedule', function () {
        it('smoke test - create schedule', function (done) {
            request(mock)
                .post('/scheduler')
                .send(scheduler[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/interval/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('smoke test - create schedule', function (done) {
            request(mock)
                .post('/scheduler')
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .expect('Content-Type', /json/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Create schedule - create second schedule', function (done) {
            request(mock)
                .post('/scheduler')
                .send(scheduler[1])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Create schedule - validate fail schedule', function (done) {
            request(mock)
                .post('/scheduler')
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .expect('Content-Type', /json/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    /**
     *
     * Read schedule
     * @depends read schedule
     * @description I like to see my scheduler
     */
    describe('read schedule', function () {
        it('Exist schedule - list my schedule', function (done) {
            request(mock)
                .get('/scheduler')
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"MySchedule\"/)
                .expect(/_id/)
                .expect(function(res) {
                    expect(res.body.items).to.have.length(2);
                })
                .expect(function(res) {
                    Object.assign(scheduler[0], res.body.items[0]);
                    Object.assign(scheduler[1], res.body.items[1]);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist schedule - list my schedule without token', function (done) {
            request(mock)
                .get('/scheduler')
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist schedule - list my schedule with filter', function (done) {
            request(mock)
                .get('/scheduler')
                .query({name: scheduler[0].name})
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .expect(/_id/)
                .expect(function(res) {
                    expect(res.body.items).to.have.length(1);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist schedule - see my new schedule', function (done) {
            request(mock)
                .get('/scheduler/'+scheduler[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/period_type/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist schedule - see my new schedule without token', function (done) {
            request(mock)
                .get('/scheduler/'+scheduler[0]._id)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


        it('Exist schedule -  autocomplete without token', function (done) {
            request(mock)
                .get('/scheduler/autocomplete')
                .query({complete: "second"})
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    /**
     *
     * Update schedule
     * @depends update schedule
     * @description I like to update my schedule
     */
    describe('update schedule', function () {
        it('Exist schedule - update schedule with valid data', function (done) {
            const data = Object.assign(scheduler[0], {name: "changed"});

            request(mock)
                .patch('/scheduler/'+scheduler[0]._id)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(202)
                .expect('Content-Type', /json/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist schedule - try to update schedule without token', function (done) {
            const data = Object.assign(scheduler[0], {name: "changed"});

            request(mock)
                .patch('/scheduler/'+scheduler[0]._id)
                .send(data)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure update schedule', function () {
        it('Exist scheduler - ensure my changes', function (done) {
            request(mock)
                .get('/scheduler/'+scheduler[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/changed/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist schedule - ensure if my update don`t create a new schedule', function (done) {
            request(mock)
                .get('/scheduler')
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"MySchedule\"/)
                .expect(/_id/)
                .expect(function(res) {
                    expect(res.body.items).to.have.length(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    /**
     *
     * Delete schedule
     * @depends delete schedule
     * @description I like to delete my schedule
     */
    describe('delete schedule', function () {
        it('delete my schedule', function (done) {
            request(mock)
                .delete('/scheduler/'+scheduler[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure delete schedule', function () {
        it('delete my schedule', function (done) {
            request(mock)
                .get('/scheduler/')
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
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
