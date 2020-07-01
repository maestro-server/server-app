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


    let reports = [{
        name: "MyReport",
        report: "general",
        fields: {}
    }, {
        name: "MyReport2",
        report: "general",
        fields: {}
    }];

    let friend = {
        name: "Friend",
        email: "friend@maestrousers.com",
        password: "mytester",
        token: null,
        _id: null
    };

    before(function (done) {
        cleaner_db([{tb: 'users'}, {tb: 'reports'}], () => {
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
    describe('create report', function () {
        it('smoke test - create report', function (done) {
            request(mock)
                .post('/reports')
                .send(reports[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/REPORT service was disabled/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('smoke test - create report', function (done) {
            request(mock)
                .post('/reports')
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .expect('Content-Type', /json/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Create report - create second report', function (done) {
            request(mock)
                .post('/reports')
                .send(reports[1])
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Create report - validate fail report', function (done) {
            request(mock)
                .post('/reports')
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
     * Read report
     * @depends read report
     * @description I like to see my reports
     */
    describe('read report', function () {
        it('Exist report - list my report', function (done) {
            request(mock)
                .get('/reports')
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"MyReport\"/)
                .expect(/_id/)
                .expect(function(res) {
                    expect(res.body.items).to.have.length(2);
                })
                .expect(function(res) {
                    Object.assign(reports[0], res.body.items[0]);
                    Object.assign(reports[1], res.body.items[1]);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist report - list my report without token', function (done) {
            request(mock)
                .get('/reports')
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist report - list my report with filter', function (done) {
            request(mock)
                .get('/reports')
                .query({name: reports[0].name})
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/name"/)
                .expect(/_id/)
                .expect(function(res) {
                    expect(res.body.items).to.have.length(1);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist report - see my new report', function (done) {
            request(mock)
                .get('/reports/'+reports[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist report - see my new report without token', function (done) {
            request(mock)
                .get('/reports/'+reports[0]._id)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


        it('Exist report -  autocomplete without token', function (done) {
            request(mock)
                .get('/reports/autocomplete')
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
     * Update report
     * @depends update report
     * @description I like to update my report
     */
    describe('update report', function () {
        it('Exist report - update report with valid data', function (done) {
            const data = Object.assign(reports[0], {name: "ChangeName"});

            request(mock)
                .patch('/reports/'+reports[0]._id)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist report - try to update report without token', function (done) {
            const data = Object.assign(reports[0], {name: "ChangeName"});

            request(mock)
                .patch('/reports/'+reports[0]._id)
                .send(data)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure update report', function () {
        it('Exist reports - ensure my changes', function (done) {
            request(mock)
                .get('/reports/'+reports[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/ChangeName/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist report - ensure if my update don`t create a new report', function (done) {
            request(mock)
                .get('/reports')
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"MyReport\"/)
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
     * Delete report
     * @depends delete report
     * @description I like to delete my report
     */
    describe('delete report', function () {
        it('delete my report', function (done) {
            request(mock)
                .delete('/reports/'+reports[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure delete report', function () {
        it('delete my report', function (done) {
            request(mock)
                .get('/reports/')
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
