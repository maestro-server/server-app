'use strict';
require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    request = require('supertest'),
    cleaner_db = require('./libs/cleaner_db'),
    {expect} = chai,
    _ = require('lodash');


describe('e2e system', function () {

    let app, mock;

    let user = {
        name: "MaestroUsers",
        email: "maestro@maestrousers.com",
        newemail: "mynew@mail.com",
        password: "mytester",
        token: null,
        _id: null
    };

    let system = [{
        name: "Firstsystem",
        description: "Description of my system",
        clients:  [{name: "Name client", _id: "5a38847dd74db113823cd00e"}],
        check:  [{key: 'Checker', value: 'ValueChecker'}],
        tags: [{key: 'Tager', value: 'ValueTager'}]
    }, {
        name: "Secondsystem",
        description: "Description of my system",
        thisFieldMustnApper: 'NotApper'
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
        cleaner_db([{tb: 'users'}, {tb: 'systems'}, {tb: 'teams'}], () => {
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
     * Create system
     * @depends create user
     * @description I like to create a new system
     */
    describe('create system', function () {
        it('create system - create system', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/system`)
                .send(system[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .expect(/description/)
                .expect(/Firstsystem/)
                .expect(/clients/)
                .expect(/check/)
                .expect(/tags/)
                .expect(/ValueTager/)
                .expect(/Checker/)
                .expect(/ValueChecker/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create system - create system without token', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/system`)
                .send(system[0])
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create system - create second system', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/system`)
                .send(system[1])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .expect(/description/)
                .expect(/Secondsystem/)
                .expect(/_id/)
                .expect(res => !res.hasOwnProperty('thisFieldMustnApper'))
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create system - validate fail', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/system`)
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
     * Get system
     * @depends create system
     * @description I like to see my news system
     */
    describe('read system', function () {
        it('list my system', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/system`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"Firstsystem\"/)
                .expect(/clients/)
                .expect(/check/)
                .expect(/tags/)
                .expect(/ValueTager/)
                .expect(/Checker/)
                .expect(/ValueChecker/)
                .expect(/_id/)
                .expect(/_link/)
                .expect(/found/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(2);
                })
                .expect(function (res) {
                    Object.assign(system[0], res.body.items[0]);
                    Object.assign(system[1], res.body.items[1]);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('count my system', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/system/count`)
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

        it('list my system without token', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/system`)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('list my system with filter', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/system`)
                .query({name: system[0].name})
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
                .get(`/teams/${teams._id}/system`)
                .query({limit: 1, page: 2})
                .expect(/Firstsystem/)
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

        it('Exist system - test pagination list', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/system`)
                .query({limit: 1, page: 40})
                .set('Authorization', `JWT ${user.token}`)
                .expect(404)
                .expect(/not found/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('see my new system', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/system/${system[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .expect(/_link/)
                .expect(function (res) {
                    let roles = res.body['roles'].map(e=>_.omit(e, ['_links']))
                    Object.assign(system[0], {roles});
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


        it('see my new system without token', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/system/${system[0]._id}`)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('autocomplete', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/system/`)
                .query({query: '{"name": "system"}'})
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('autocomplete - not found', function (done) {
            request(mock)
                .get("/system/")
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
                .get(`/teams/${teams._id}/system/autocomplete`)
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
     * Patch system
     * @depends create system
     * @description I like to update my system witch name ChangeName, or add some services/auth/tags
     */
    describe('patch system', function () {
        it('patch system, changing name', function (done) {
            const data = Object.assign(system[0], {name: "ChangeName"});

            request(mock)
                .patch(`/teams/${teams._id}/system/${system[0]._id}`)
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

        it('patch system add one clients', function (done) {
            let data = Object.assign({}, system[0]);
            data['clients'].push({name: 'MySecondClients', _id: "5a38847dd74db113823cd00b"});

            request(mock)
                .patch(`/teams/${teams._id}/system/${system[0]._id}`)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(202)
                .expect('Content-Type', /json/)
                .expect(/clients/)
                .expect(/MySecondClients/)
                .expect(function (res) {
                    expect(res.body['clients']).to.have.length(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('patch system add new invalidate clients (outherTag key)', function (done) {
            let data = _.cloneDeep(system[0]);
            data['clients'].push({outherKey: 'email', value: "valuee"});

            request(mock)
                .patch(`/teams/${teams._id}/system/${system[0]._id}`)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('patch system add one check (Valuer2, Checker2)', function (done) {
            let data = Object.assign({}, system[0]);
            data['check'].push({key: 'Valuer2', value: 'Checker2'});

            request(mock)
                .patch(`/teams/${teams._id}/system/${system[0]._id}`)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(202)
                .expect('Content-Type', /json/)
                .expect(/check/)
                .expect(/Valuer2/)
                .expect(/Checker2/)
                .expect(function (res) {
                    expect(res.body['check']).to.have.length(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('patch system add new invalidate check (outherTag key)', function (done) {
            let data = _.cloneDeep(system[0]);
            data['check'].push({outherKey: 'email', value: "valuee"});

            request(mock)
                .patch(`/teams/${teams._id}/system/${system[0]._id}`)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


        it('patch system add new tag (newTag, myvalue)', function (done) {
            let data = Object.assign({}, system[0]);
            data['tags'].push({key: 'newTag', value: 'myValue'});

            request(mock)
                .patch(`/teams/${teams._id}/system/${system[0]._id}`)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(202)
                .expect('Content-Type', /json/)
                .expect(/tags/)
                .expect(/newTag/)
                .expect(/myValue/)
                .expect(function (res) {
                    expect(res.body['tags']).to.have.length(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('patch system add new invalidate tag (outherTag key)', function (done) {
            let data = _.cloneDeep(system[0]);
            data['tags'].push({outherKey: 'email', value: "valuee"});

            request(mock)
                .patch(`/teams/${teams._id}/system/${system[0]._id}`)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('invalid data to patch system (empty test data)', function (done) {

            request(mock)
                .patch(`/teams/${teams._id}/system/${system[0]._id}`)
                .send({})
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('try to patch system without token, and verify the error', function (done) {
            const data = Object.assign(system[0], {name: "ChangeName"});

            request(mock)
                .patch(`/teams/${teams._id}/system/${system[0]._id}`)
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
     * Put system
     * @depends create system
     * @description I like to update my system witch name ChangeName
     */
    describe('update system', function () {
        it('put system with valid data', function (done) {
            const data = Object.assign(system[0], {name: "ChangeNameWithPut"});

            request(mock)
                .put(`/teams/${teams._id}/system/${system[0]._id}`)
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
     * Check updates/patchs system
     * @depends create system
     * @description I like ensure some effects
     */
    describe('ensure update system', function () {

        it('ensure my changes', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/system/${system[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/ChangeNameWithPut/)
                .expect(/newTag/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('ensure if any of my updates/patchs don`t create new system', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/system`)
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
     * @description I like to add new role into my Mysystem
     */
    describe('e2e teams: add roles', function () {
        it('valid data to add roles', function (done) {
            const data = {role: "3", id: friend._id, refs: "users", name: friend.name, email: friend.email};

            request(mock)
                .post(`/teams/${teams._id}/system/${system[0]._id}/roles`)
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
                .post(`/teams/${teams._id}/system/${system[0]._id}/roles`)
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
                .post(`/teams/${teams._id}/system/${system[0]._id}/roles`)
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
                .post(`/teams/${teams._id}/system/${system[0]._id}/roles`)
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
                .get(`/teams/${teams._id}/system/${system[0]._id}`)
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
     * @description I like to update the role system role
     */
    describe('update roles', function () {
        it('Exist roles - update role system', function (done) {
            request(mock)
                .put(`/teams/${teams._id}/system/${system[0]._id}/roles`)
                .send(system[0].roles)
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/users/)
                .expect(function (res) {
                    system[0]['roles'] = res.body.items
                    expect(res.body.items).to.have.length(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('update role system without token', function (done) {
            request(mock)
                .put(`/teams/${teams._id}/system/${system[0]._id}/roles`)
                .send(system[0].roles)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('update roles add new role and update all of them', function () {
        it('Exist roles - update role system, add new role', function (done) {
            let roles = system[0].roles
            roles.push({role: 3, refs: 'organization'});

            request(mock)
                .put(`/teams/${teams._id}/system/${system[0]._id}/roles`)
                .send(roles)
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/organization/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(3);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('update single roles', function () {
        it('Exist roles - update role system', function (done) {
            request(mock)
                .put(`/teams/${teams._id}/system/${system[0]._id}/roles/${friend._id}`)
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

        it('update single role system without token', function (done) {
            request(mock)
                .put(`/teams/${teams._id}/system/${system[0]._id}/roles/${friend._id}`)
                .send({role: "1", refs: "users", name: friend.name, email: friend.email})
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure update roles', function () {
        it('Exist roles - ensure my news system', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/system/${system[0]._id}`)
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
     * @depends create system
     * @description I have SecondApp, and ai like to delete on role
     */
    describe('delete roles', function () {
        it('Exist roles - delete role', function (done) {
            request(mock)
                .delete(`/teams/${teams._id}/system/${system[0]._id}/roles/${friend._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist roles - delete role without token', function (done) {
            request(mock)
                .delete(`/teams/${teams._id}/system/${system[0]._id}/roles/${friend._id}`)
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
                .get(`/teams/${teams._id}/system/${system[0]._id}`)
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
    =========================================================== delete system
     */

    /**
     *
     * Delete system
     * @depends create 2
     * @description I have 2 system, i like to delete Secondsystem.
     */
    describe('delete system', function () {
        it('Exist roles - delete my system', function (done) {
            request(mock)
                .delete(`/teams/${teams._id}/system/${system[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure to delete system', function () {
        it('Exist roles - delete my system', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/system/`)
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
