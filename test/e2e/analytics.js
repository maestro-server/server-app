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


    let graphs = [{
        name: "MyGraph",
        type: "bussiness",
        fields: {}
    }, {
        name: "MyGraph2",
        type: "bussiness",
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
        cleaner_db([{tb: 'users'}, {tb: 'graphs'}], () => {
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
    describe('create graph', function () {
        it('smoke test - create graph', function (done) {
            request(mock)
                .post('/graphs')
                .send(graphs[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/ANALYTICS service was disabled/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('smoke test - create graph', function (done) {
            request(mock)
                .post('/graphs')
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .expect('Content-Type', /json/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Create graph - create second graph', function (done) {
            request(mock)
                .post('/graphs')
                .send(graphs[1])
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Create graph - validate fail graph', function (done) {
            request(mock)
                .post('/graphs')
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
     * Read graph
     * @depends read graph
     * @description I like to see my graphs
     */
    describe('read graph', function () {
        it('Exist graph - list my graph', function (done) {
            request(mock)
                .get('/graphs')
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"MyGraph\"/)
                .expect(/_id/)
                .expect(function(res) {
                    expect(res.body.items).to.have.length(2);
                })
                .expect(function(res) {
                    Object.assign(graphs[0], res.body.items[0]);
                    Object.assign(graphs[1], res.body.items[1]);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist graph - list my graph without token', function (done) {
            request(mock)
                .get('/graphs')
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist graph - list my graph with filter', function (done) {
            request(mock)
                .get('/graphs')
                .query({name: graphs[0].name})
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

        it('Exist graph - see my new graph', function (done) {
            request(mock)
                .get('/graphs/'+graphs[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist graph - see my new graph without token', function (done) {
            request(mock)
                .get('/graphs/'+graphs[0]._id)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


        it('Exist graph -  autocomplete without token', function (done) {
            request(mock)
                .get('/graphs/autocomplete')
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
     * Update graph
     * @depends update graph
     * @description I like to update my graph
     */
    describe('update graph', function () {
        it('Exist graph - update graph with valid data', function (done) {
            const data = Object.assign(graphs[0], {name: "ChangeName"});

            request(mock)
                .patch('/graphs/'+graphs[0]._id)
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

        it('Exist graph - try to update graph without token', function (done) {
            const data = Object.assign(graphs[0], {name: "ChangeName"});

            request(mock)
                .patch('/graphs/'+graphs[0]._id)
                .send(data)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure update graph', function () {
        it('Exist graphs - ensure my changes', function (done) {
            request(mock)
                .get('/graphs/'+graphs[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/ChangeName/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist graph - ensure if my update don`t create a new graph', function (done) {
            request(mock)
                .get('/graphs')
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"MyGraph\"/)
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
     * Delete graph
     * @depends delete graph
     * @description I like to delete my graph
     */
    describe('delete graph', function () {
        it('delete my graph', function (done) {
            request(mock)
                .delete('/graphs/'+graphs[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure delete graph', function () {
        it('delete my graph', function (done) {
            request(mock)
                .get('/graphs/')
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
