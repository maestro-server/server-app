'use strict';
require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    request = require('supertest'),
    cleaner_db = require('./libs/cleaner_db'),
    _ = require('lodash'),
    {expect} = chai;

describe('e2e users', function () {
    let app, mock;

    let user = {
        name: "MaestroUsers",
        email: "maestro@maestrousers.com",
        newemail: "mynew@mail.com",
        password: "mytester",
        newpass: "mynewtester",
        token: null,
        _id: null,
        callback_url: "http://localhost:1337"
    };

    before(function (done) {
      cleaner_db([{tb: 'users'}], () => {
        app = require('./libs/bootApp')();

        app.once('start', done);
        mock = app.listen(1347);
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

    /**
    *
    * Get user
    * @depends create user
    * @description I like to see my account
    */
    describe('get users, autocomplete', function () {
        it('Exist user - see my changes - /me', function (done) {
            request(mock)
                .get('/me')
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"MaestroUsers\"/)
                .expect(/maestro@maestrousers\.com/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist user - autocomplete', function (done) {
            request(mock)
                    .get('/users/autocomplete')
                .query({complete: "maestro"})
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect(/\"name\":\"MaestroUsers\"/)
                .expect(/_id/)
                .expect(function(res) {
                    expect(res.body.items).to.have.length(1);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist user - Upload Files', function (done) {
            request(mock)
                .get('/users/upload')
                .query({filetype:'image/jpeg', filename: 'my.jpg'})
                .set('Authorization', `JWT ${user.token}`)
                .expect(console.log)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/filename/)
                .expect(/signedRequest/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist user - Upload Files - error', function (done) {
            request(mock)
                .get('/users/upload')
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .expect('Content-Type', /json/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist user - Upload Files - without token', function (done) {
            request(mock)
                .get('/users/upload')
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Smoke test in audit', function (done) {
            request(mock)
                .get('/me/audit')
                .set('Authorization', `JWT ${user.token}`)
                .expect(501)
                .expect('Content-Type', /json/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    /**
    *
    * Update user
    * @depends update my account
    * @description I like to change my account
    */
    describe('update my account', function () {

        it('Exist user - update my account without token', function (done) {
            const data = {
                name: "MyNameIsChange"
            };

            request(mock)
                .patch('/me')
                .send(data)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist user - update my account', function (done) {
            const data = {
                name: "MyNameIsChange"
            };

            request(mock)
                .patch('/me')
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(202)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"MyNameIsChange\"/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist user - update my account by with exist email', function (done) {
            const data = {
                name: "MyNameIsChange",
                email: "maestro@maestrousers.com"
            };

            request(mock)
                .patch('/me')
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(409)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });


    describe('see my updates', function () {
        it('Exist user - see my changes - /me', function (done) {
            request(mock)
                .get('/me')
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"MyNameIsChange\"/)
                .expect(/maestro@maestrousers\.com/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist user - see my changes - /:id', function (done) {
            request(mock)
                .get('/users/'+user._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"MyNameIsChange\"/)
                .expect(/maestro@maestrousers\.com/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


    });

    /**
    *
    * Change password
    * @depends create user
    * @description I like to change my password
    */
    describe('change password', function () {
        it('Existe user - change my password', function (done) {

            request(mock)
                .patch('/users/auth/pass')
                .send(user)
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Existe user - valid newpass change pass', function (done) {

            request(mock)
                .patch('/users/auth/pass')
                .send(_.pick(user, 'email', 'nome', 'password'))
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Existe user - change password, without token', function (done) {

            request(mock)
                .patch('/users/auth/pass')
                .send(_.pick(user, 'email', 'nome', 'password'))
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('change password again', function () {
        it('Existe user - try to change my password again', function (done) {

            request(mock)
                .patch('/users/auth/pass')
                .send(user)
                .set('Authorization', `JWT ${user.token}`)
                .expect(400)
                .expect(/Invalid/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    /**
    *
    * Change email
    * @depends create user
    * @description I like to change my email
    */
    describe('change email', function () {
        it('Existe user - change my email', function (done) {
            const data = Object.assign({}, user, {email: user.newemail});

            request(mock)
                .patch('/me')
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(202)
                .expect(/mynew@mail\.com/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });



    describe('test my new email and password', function () {
        it('Existe user - test with same pass and email', function (done) {

            request(mock)
                .post('/users/auth')
                .send(user)
                .expect(400)
                .expect('Content-Type', /json/)
                .expect(/Invalid/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Existe user - get new token with new email and password', function (done) {
            const data = {email: user.newemail, password: user.newpass};

            request(mock)
                .post('/users/auth')
                .send(data)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    /**
    *
    * Forgot my password
    * @depends create user
    * @description I forgot my password, i like to recovery
    */
    describe('forgot my password', function () {
        it('If i make a get, don`t call id users', function (done) {
            request(mock)
                .get('/users/forgot')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Existe user - forgot callback url', function (done) {
            request(mock)
                .post('/users/forgot')
                .expect(422)
                .expect('Content-Type', /json/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Existe user - valid forgot - email not found', function (done) {
            const data = {email: "notExist@a.com", callback_url: user.callback_url};

            request(mock)
                .post('/users/forgot')
                .send(data)
                .expect(400)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Existe user - valid forgot', function (done) {
            const data = {email: user.newemail, callback_url: user.callback_url};

            request(mock)
                .post('/users/forgot')
                .send(data)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Existe user - change password - miss token and password', function (done) {
            request(mock)
                .put('/users/forgot/change')
                .expect(422)
                .expect('Content-Type', /json/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Existe user - change password - token and password token', function (done) {
            request(mock)
                .put('/users/forgot/change')
                .send({
                    token: "eyJ0aXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImZjNWFiMjU2YjFjN2RhYmU2OTk2ZWE1MzExYmRmZTIxYTZiZTk4M2JkYzU0NmFmZmYzNzM0MDgyNWVkNjYwYmM4YzFhM2NmMDI0NmFjNjg1N2M5NDY1NzY1OWQ4ODEzYjdhOWE4YTM0ZGJhNDk1N2MyMDE2ZjljZGJjMzBkMWNhIg.b242oRHo1d6RsdPwkLCyesqmZ_wIVlHQN219Mxs5kEU",
                    password: "asdasda"})
                .expect(409)
                .expect('Content-Type', /json/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    /**
    *
    * Delete user
    * @depends create user
    * @description I like to close my account
    */
    describe('delete account', function () {
        it('Existe user - delete my account', function (done) {
            request(mock)
                .delete('/me')
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure if i am deleted', function () {
        it('Deleted user - ensure', function (done) {
            request(mock)
                .get('/me')
                .set('Authorization', `JWT ${user.token}`)
                .expect(400)
                .expect(/PermissionError/)
                .expect(/User\ not\ found/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

});
