'use strict';
require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    request = require('supertest'),
    cleaner_db = require('./libs/cleaner_db'),
    {expect} = chai;


describe('e2e architectures', function () {

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

    let architectures = [{
        name: "Myarchitecture"
    }, {
        name: "Secondarchitecture"
    }];

    before(function (done) {
      cleaner_db([{tb: 'users'}, {tb: 'architectures'}, {tb: 'teams'}], () => {
        app = require('./libs/bootApp')();

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
     ------------------------------------------------------ team app --------
     */
    let teams = {
        name: "MyTeam"
    };

    let teamsAPP = [{
        name: "MyarchitectureT"
    }, {
        name: "SecondarchitectureT"
    }];


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

    describe('create team architecture', function () {
        it('Create team architecture - create team architecture', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/architectures`)
                .send(teamsAPP[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/MyarchitectureT/)
                .expect(/teams/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


        it('Create team architecture - create second architecture', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/architectures`)
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

    /**
     *
     * Get architectures
     * @depends create architecture
     * @description I like to see my news architectures
     */
    describe('read team architecture', function () {
        it('list my architecture', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/architectures`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"MyarchitectureT\"/)
                .expect(/_id/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(2);
                })
                .expect(function (res) {
                    Object.assign(teamsAPP[0], res.body.items[0]);
                    Object.assign(teamsAPP[1], res.body.items[1]);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team architecture - list my architecture without token', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/architectures`)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team architecture - list my architecture with filter', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/architectures`)
                .query({name: teamsAPP[0].name})
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .expect(/_id/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(1);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team architecture - test pagination list', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/architectures`)
                .query({limit: 1, page: 2})
                .expect(/Myarchitecture/)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(1);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team architecture - see my new architecture', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/architectures/${teamsAPP[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team architecture - see my new architecture without token', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/architectures/${teamsAPP[0]._id}`)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    /**
     *
     * Update architecture
     * @depends create architecture
     * @description I like to update my architecture witch name ChangeName
     */
    describe('update team architecture', function () {
        it('Exist team architecture - update architecture with valid data', function (done) {
            const data = Object.assign(teamsAPP[0], {name: "ChangeName"});

            request(mock)
                .patch(`/teams/${teams._id}/architectures/${teamsAPP[0]._id}`)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(202)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"ChangeName\"/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team architecture - invalid data to update architecture', function (done) {

            request(mock)
                .patch(`/teams/${teams._id}/architectures/${teamsAPP[0]._id}`)
                .send({})
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team architecture - try to update architecture withou token', function (done) {
            const data = Object.assign(teamsAPP[0], {name: "ChangeName"});

            request(mock)
                .patch(`/teams/${teams._id}/architectures/${teamsAPP[0]._id}`)
                .send(data)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('confirm team update architecture', function () {

        it('Exist team architecture - confirm my changes', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/architectures/${teamsAPP[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/ChangeName/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team architecture - confirm if my update dont create new architecture', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/architectures`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function (res) {
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
     * Delete architectures
     * @depends create 2
     * @description I have 2 architectures, i like to delete Secondarchitecture.
     */
    describe('delete team architecture', function () {
        it('Exist roles - delete my architecture', function (done) {
            request(mock)
                .delete(`/teams/${teams._id}/architectures/${teamsAPP[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('confirm team  delete architecture', function () {
        it('Exist roles - delete my architecture', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/architectures`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(1);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });


});
