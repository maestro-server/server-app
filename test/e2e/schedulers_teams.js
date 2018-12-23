'use strict';
require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    request = require('supertest'),
    cleaner_db = require('./libs/cleaner_db'),
    {expect} = chai,
    _ = require('lodash');


describe('e2e scheduler', function () {

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
        name: "Myscheduler",
        endpoint: "http://google.com",
        interval: {
            period: "seconds",
            every: 6
        },
        tags: [{key: 'Tager', value: 'ValueTager'}]
    }, {
        name: "MySeconbdscheduler",
        endpoint: "http://google.com",
        interval: {
            period: "minutes",
            every: 6
        }
    }];

    let friend = {
        name: "Friend",
        email: "friend@maestrousers.com",
        password: "mytester",
        token: null,
        _id: null
    };

    let teams = {
        name: "MyTeam"
    };

    let teamsAPP = [{
        name: "MyarchitectureT"
    }, {
        name: "SecondarchitectureT"
    }];

    before(function (done) {
        cleaner_db([{tb: 'users'}, {tb: 'scheduler'}, {tb: 'teams'}], () => {
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

    /**
     *
     * Create scheduler
     * @depends create user
     * @description I like to create a new scheduler
     */
    describe('create scheduler', function () {
        it('create scheduler - create scheduler', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/scheduler`)
                .send(scheduler[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect(/Myscheduler/)
                .expect(/seconds/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create scheduler - create scheduler without token', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/scheduler`)
                .send(scheduler[0])
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create scheduler - create second scheduler', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/scheduler`)
                .send(scheduler[1])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .expect(/_id/)
                .expect(res => !res.hasOwnProperty('thisFieldMustnApper'))
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create scheduler - validate fail', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/scheduler`)
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
     * Get scheduler
     * @depends create scheduler
     * @description I like to see my news scheduler
     */
    describe('read scheduler', function () {
        it('list my scheduler', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/scheduler`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/Myscheduler/)
                .expect(/Myscheduler/)
                .expect(/seconds/)
                .expect(/_id/)
                .expect(/_link/)
                .expect(/found/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(2);
                })
                .expect(function (res) {
                    Object.assign(scheduler[0], res.body.items[0]);
                    Object.assign(scheduler[1], res.body.items[1]);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('count my scheduler', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/scheduler/count`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.count).to.equal(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('list my scheduler without token', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/scheduler`)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('list my scheduler with filter', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/scheduler`)
                .query({name: scheduler[0].name})
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

        it('test pagination list', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/scheduler`)
                .query({limit: 1, page: 2})
                .expect(/Myscheduler/)
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

        it('Exist scheduler - test pagination list', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/scheduler`)
                .query({limit: 1, page: 40})
                .set('Authorization', `JWT ${user.token}`)
                .expect(404)
                .expect(/not found/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('see my new scheduler', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/scheduler/${scheduler[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .expect(/_link/)
                .expect(function (res) {
                    let roles = res.body['roles'].map(e=>_.omit(e, ['_links']))
                    Object.assign(scheduler[0], {roles});
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


        it('see my new scheduler without token', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/scheduler/${scheduler[0]._id}`)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('autocomplete', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/scheduler/`)
                .query({query: "{'name': 'scheduler'}"})
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('autocomplete - not found', function (done) {
            request(mock)
                .get("/scheduler/")
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
                .get(`/teams/${teams._id}/scheduler/autocomplete`)
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
     * Patch scheduler
     * @depends create scheduler
     * @description I like to update my scheduler witch name ChangeName, or add some services/auth/tags
     */
    describe('patch scheduler', function () {
        it('patch scheduler, changing name', function (done) {
            const data = Object.assign(scheduler[0], {name: "ChangeName"});

            request(mock)
                .patch(`/teams/${teams._id}/scheduler/${scheduler[0]._id}`)
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

        it('patch need tpo pass (empty test data)', function (done) {

            request(mock)
                .patch(`/teams/${teams._id}/scheduler/${scheduler[0]._id}`)
                .send({})
                .set('Authorization', `JWT ${user.token}`)
                .expect(202)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('try to patch scheduler without token, and verify the error', function (done) {
            const data = Object.assign(scheduler[0], {name: "ChangeName"});

            request(mock)
                .patch(`/teams/${teams._id}/scheduler/${scheduler[0]._id}`)
                .send(data)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    /**
     *
     * Put scheduler
     * @depends create scheduler
     * @description I like to update my scheduler witch name ChangeName, or change my cpu
     */
    describe('update scheduler', function () {
        it('put scheduler with valid data', function (done) {
            const data = Object.assign({}, scheduler[0], {name: "ChangeNameWithPut"});

            request(mock)
                .put(`/teams/${teams._id}/scheduler/${scheduler[0]._id}`)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(202)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"ChangeNameWithPut\"/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    /**
     *
     * Check updates/patchs scheduler
     * @depends create scheduler
     * @description I like ensure some effects
     */
    describe('ensure update scheduler', function () {

        it('ensure my changes', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/scheduler/${scheduler[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/ChangeNameWithPut/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('ensure if any of my updates/patchs don`t create new scheduler', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/scheduler`)
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






    /*
    =============================================== roles ==================================================
     */

    /**
     *
     * Create roles
     * @depends create team roles
     * @description I like to add new role on my Myscheduler
     */
    describe('e2e teams: add roles', function () {
        it('valid data to add roles', function (done) {
            const data = {role: "3", id: friend._id, refs: "users", name: friend.name, email: friend.email};

            request(mock)
                .post(`/teams/${teams._id}/scheduler/${scheduler[0]._id}/roles`)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/\"refs\":\"users\"/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('invalid data to add roles (miss role)', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/scheduler/${scheduler[0]._id}/roles`)
                .send(friend)
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('add roles without token', function (done) {
            const data = {role: "3", id: friend._id, refs: "users"};

            request(mock)
                .post(`/teams/${teams._id}/scheduler/${scheduler[0]._id}/roles`)
                .send(data)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('e2e teams: add duplicate role roles', function () {
        it('don`t insert double roles', function (done) {
            const data = {role: "3", id: friend._id, refs: "users", name: friend.name, email: friend.email};

            request(mock)
                .post(`/teams/${teams._id}/scheduler/${scheduler[0]._id}/roles`)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(400)
                .expect('Content-Type', /json/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    /**
     *
     * Get roles
     * @depends create roles
     * @description I like to see my roles
     */
    describe('get roles', function () {
        it('Exist roles - ensure my news roles', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/scheduler/${scheduler[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/Friend/)
                .expect(/\"role\"\:3/)
                .expect(function (res) {
                    expect(res.body.roles).to.have.length(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    /**
     *
     * Update roles
     * @depends create role
     * @description I like to update the role scheduler role
     */
    describe('update roles', function () {
        it('Exist roles - update role scheduler', function (done) {
            request(mock)
                .put(`/teams/${teams._id}/scheduler/${scheduler[0]._id}/roles`)
                .send(scheduler[0].roles)
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/teams/)
                .expect(function (res) {
                    scheduler[0]['roles'] = res.body.items
                    expect(res.body.items).to.have.length(1);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('update role scheduler without token', function (done) {
            request(mock)
                .put(`/teams/${teams._id}/scheduler/${scheduler[0]._id}/roles`)
                .send(scheduler[0].roles)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('update roles add new role and update all of them', function () {
        it('Exist roles - update role scheduler, add new role', function (done) {
            let roles = scheduler[0].roles
            roles.push({role: 3, refs: 'organization'});

            request(mock)
                .put(`/teams/${teams._id}/scheduler/${scheduler[0]._id}/roles`)
                .send(roles)
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/organization/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('update single roles', function () {
        it('Exist roles - update role scheduler', function (done) {
            request(mock)
                .put(`/teams/${teams._id}/scheduler/${scheduler[0]._id}/roles/${friend._id}`)
                .send({role: "1", refs: "users", name: friend.name, email: friend.email})
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/\"role\"\:1/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('update single role scheduler without token', function (done) {
            request(mock)
                .put(`/teams/${teams._id}/scheduler/${scheduler[0]._id}/roles/${friend._id}`)
                .send({role: "1", refs: "users", name: friend.name, email: friend.email})
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure update roles', function () {
        it('Exist roles - ensure my news scheduler', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/scheduler/${scheduler[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/Friend/)
                .expect(/\"role\"\:1/)
                .expect(function (res) {
                    expect(res.body.roles).to.have.length(3);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    /**
     *
     * Delete roles
     * @depends create scheduler
     * @description I have SecondApp, and ai like to delete on role
     */
    describe('delete roles', function () {
        it('Exist roles - delete role', function (done) {
            request(mock)
                .delete(`/teams/${teams._id}/scheduler/${scheduler[0]._id}/roles/${friend._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist roles - delete role without token', function (done) {
            request(mock)
                .delete(`/teams/${teams._id}/scheduler/${scheduler[0]._id}/roles/${friend._id}`)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure delete roles', function () {
        it('Exist roles - ensure my news role', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/scheduler/${scheduler[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    expect(res.body.roles).to.have.length(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });



    /*
    =========================================================== delete scheduler
     */

    /**
     *
     * Delete scheduler
     * @depends create 2
     * @description I have 2 scheduler, i like to delete Secondscheduler.
     */
    describe('delete scheduler', function () {
        it('Exist roles - delete my scheduler', function (done) {
            request(mock)
                .delete(`/teams/${teams._id}/scheduler/${scheduler[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure to delete scheduler', function () {
        it('Exist roles - delete my scheduler', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/scheduler/`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    expect(res.body.items[0]).to.have.include({'crawling': true});
                    expect(res.body.items).to.have.length(1);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });



});
