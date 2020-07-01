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


    let events = [{
        msg: "MyEvent",
        context: "general",
        fields: {}
    }, {
        msg: "MyEvent2",
        context: "general",
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
        cleaner_db([{tb: 'users'}, {tb: 'events'}], () => {
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
    describe('create event', function () {
        it('smoke test - create event', function (done) {
            request(mock)
                .post('/events')
                .send(events[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/general/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('smoke test - create event', function (done) {
            request(mock)
                .post('/events')
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .expect('Content-Type', /json/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Create event - create second event', function (done) {
            request(mock)
                .post('/events')
                .send(events[1])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Create event - validate fail event', function (done) {
            request(mock)
                .post('/events')
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
     * Read event
     * @depends read event
     * @description I like to see my events
     */
    describe('read event', function () {
        it('Exist event - list my event', function (done) {
            request(mock)
                .get('/events')
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"msg\":\"MyEvent\"/)
                .expect(/_id/)
                .expect(function(res) {
                    expect(res.body.items).to.have.length(2);
                })
                .expect(function(res) {
                    Object.assign(events[0], res.body.items[0]);
                    Object.assign(events[1], res.body.items[1]);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist event - list my event without token', function (done) {
            request(mock)
                .get('/events')
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist event - list my event with filter', function (done) {
            request(mock)
                .get('/events')
                .query({msg: events[0].msg})
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/msg/)
                .expect(/_id/)
                .expect(function(res) {
                    expect(res.body.items).to.have.length(1);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist event - see my new event', function (done) {
            request(mock)
                .get('/events/'+events[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/context/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist event - see my new event without token', function (done) {
            request(mock)
                .get('/events/'+events[0]._id)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


        it('Exist event -  autocomplete without token', function (done) {
            request(mock)
                .get('/events/autocomplete')
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
     * Update event
     * @depends update event
     * @description I like to update my event
     */
    describe('update event', function () {
        it('Exist event - update event with valid data', function (done) {
            const data = Object.assign(events[0], {context: "changed"});

            request(mock)
                .patch('/events/'+events[0]._id)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(202)
                .expect('Content-Type', /json/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist event - try to update event without token', function (done) {
            const data = Object.assign(events[0], {context: "changed"});

            request(mock)
                .patch('/events/'+events[0]._id)
                .send(data)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure update event', function () {
        it('Exist events - ensure my changes', function (done) {
            request(mock)
                .get('/events/'+events[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/changed/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist event - ensure if my update don`t create a new event', function (done) {
            request(mock)
                .get('/events')
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"msg\":\"MyEvent\"/)
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
     * Delete event
     * @depends delete event
     * @description I like to delete my event
     */
    describe('delete event', function () {
        it('delete my event', function (done) {
            request(mock)
                .delete('/events/'+events[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure delete event', function () {
        it('delete my event', function (done) {
            request(mock)
                .get('/events/')
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
