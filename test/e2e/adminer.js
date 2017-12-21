'use strict';
require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    request = require('supertest'),
    cleaner_db = require('./libs/cleaner_db'),
    insert_db = require('./libs/insert_db'),
    {expect} = chai,
    _ = require('lodash');



describe('e2e adminer', function () {

    let app, mock;

    let user = {
        name: "MaestroUsers",
        email: "maestro@maestrousers.com",
        newemail: "mynew@mail.com",
        password: "mytester",
        token: null,
        _id: null
    };

    let adminer = [{
        key: "Myadminer",
        value: {
            glossery: "Some glosseries"
        },
        active: true
    }];

    before(function (done) {
        cleaner_db([{tb: 'users'}, {tb: 'adminer'}, {tb: 'teams'}], () => {
            insert_db(adminer[0], 'adminer', (e) => {
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
     * Get adminer
     * @depends create adminer
     * @description I like to see my news adminer
     */
    describe('read adminer', function () {


        it('list my adminer without token', function (done) {
            request(mock)
                .get('/adminer')
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('list my adminer with filter', function (done) {
            request(mock)
                .get('/adminer')
                .query({key: adminer[0].key})
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/Myadminer/)
                .expect(/value/)
                .expect(/glosseries/)
                .expect(/_id/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(1);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist adminer - test pagination list', function (done) {
            request(mock)
                .get('/adminer')
                .query({limit: 1, page: 40})
                .set('Authorization', `JWT ${user.token}`)
                .expect(404)
                .expect(/not found/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('see my new adminer', function (done) {
            request(mock)
                .get('/adminer')
                .query({key: adminer[0].key})
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/Myadminer/)
                .expect(/_link/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


        it('see my new adminer without token', function (done) {
            request(mock)
                .get('/adminer/' + adminer[0]._id)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('autocomplete', function (done) {
            request(mock)
                .get('/adminer/')
                .query({query: "{'name': 'adminer'}"})
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('autocomplete - not found', function (done) {
            request(mock)
                .get("/adminer/")
                .query({query: '{"name": "notfuond"}'})
                .set('Authorization', `JWT ${user.token}`)
                .expect(e=> e.text.found == 0)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


        it('autocomplete without token', function (done) {
            request(mock)
                .get('/adminer/autocomplete')
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
     * Patch adminer
     * @depends create adminer
     * @description I like to update my adminer witch name ChangeName, or add some services/auth/tags
     */


    describe('patch adminer', function () {
        it('patch adminer, changing name', function (done) {
            const data = Object.assign(adminer[0], {key: "ChangeName"});

            request(mock)
                .patch('/adminer/'+ adminer[0]._id)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(202)
                .expect('Content-Type', /json/)
                .expect(/\"key\":\"ChangeName\"/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('patch adminer, changing name - undefined', function (done) {
            const data = Object.assign(adminer[0], {key: "ChangeName"});

            request(mock)
                .patch('/adminer/undefined')
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(404)
                .expect('Content-Type', /json/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('try to patch adminer without token, and verify the error', function (done) {
            const data = Object.assign(adminer[0], {key: "ChangeName"});

            request(mock)
                .patch('/adminer/' + adminer[0]._id)
                .send(data)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('make sure my adminer change', function () {
        it('see my new adminer', function (done) {
            request(mock)
                .get('/adminer')
                .query({key: "ChangeName"})
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/ChangeName/)
                .expect(/_link/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('adminer not be delete or update in full state(put)', function () {
        it('try to full update adminer', function (done) {
            request(mock)
                .put('/adminer' + adminer[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(404)
                .expect('Content-Type', /json/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('try to delete adminer', function (done) {
            request(mock)
                .delete('/adminer' + adminer[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(404)
                .expect('Content-Type', /json/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

});
