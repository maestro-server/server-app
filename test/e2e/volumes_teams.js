'use strict';
require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    request = require('supertest'),
    cleaner_db = require('./libs/cleaner_db'),
    {expect} = chai,
    _ = require('lodash');


describe('e2e volumes', function () {

    let app, mock;

    let user = {
        name: "MaestroUsers",
        email: "maestro@maestrousers.com",
        newemail: "mynew@mail.com",
        password: "mytester",
        token: null,
        _id: null
    };

    let volumes = [{
        name: "Myvolume",
        size: 122,
        unique_id: "seguea",
        datacenters: {
            name: "AWS - Base",
            _id: "5a3abbce66cc383cbc8e1282",
            zone: ["us-east-1a", "us-east-1b"]
        },
        tags: [{key: 'Tager', value: 'ValueTager'}],
    }, {
        name: "MySeconbdvolume",
        size: 125,
        unique_id: "segueb"
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
        cleaner_db([{tb: 'users'}, {tb: 'volumes'}, {tb: 'teams'}], () => {
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
     * Create volume
     * @depends create user
     * @description I like to create a new volume
     */
    describe('create volume', function () {
        it('create volume - create volume', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/volumes`)
                .send(volumes[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect(/Myvolume/)
                .expect(/datacenters/)
                .expect(/AWS - Base/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create volume - create volume without token', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/volumes`)
                .send(volumes[0])
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create volume - create second volume', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/volumes`)
                .send(volumes[1])
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

        it('create volume - validate fail', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/volumes`)
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
     * Get volumes
     * @depends create volume
     * @description I like to see my news volumes
     */
    describe('read volume', function () {
        it('list my volume', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/volumes`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/Myvolume/)
                .expect(/datacenters/)
                .expect(/size/)
                .expect(/AWS - Base/)
                .expect(/_id/)
                .expect(/_link/)
                .expect(/found/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(2);
                })
                .expect(function (res) {
                    Object.assign(volumes[0], res.body.items[0]);
                    Object.assign(volumes[1], res.body.items[1]);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('count my volumes', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/volumes/count`)
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

        it('list my volume without token', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/volumes`)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('list my volume with filter', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/volumes`)
                .query({name: volumes[0].name})
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
                .get(`/teams/${teams._id}/volumes`)
                .query({limit: 1, page: 2})
                .expect(/Myvolume/)
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

        it('Exist volumes - test pagination list', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/volumes`)
                .query({limit: 1, page: 40})
                .set('Authorization', `JWT ${user.token}`)
                .expect(404)
                .expect(/not found/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('see my new volume', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/volumes/${volumes[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .expect(/_link/)
                .expect(function (res) {
                    let roles = res.body['roles'].map(e=>_.omit(e, ['_links']))
                    Object.assign(volumes[0], {roles});
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


        it('see my new volume without token', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/volumes/${volumes[0]._id}`)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('autocomplete', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/volumes/`)
                .query({query: "{'name': 'volume'}"})
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('autocomplete - not found', function (done) {
            request(mock)
                .get("/volumes/")
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
                .get(`/teams/${teams._id}/volumes/autocomplete`)
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
     * Patch volume
     * @depends create volume
     * @description I like to update my volume witch name ChangeName, or add some services/auth/tags
     */
    describe('patch volume', function () {
        it('patch volume, changing name', function (done) {
            const data = Object.assign(volumes[0], {name: "ChangeName"});

            request(mock)
                .patch(`/teams/${teams._id}/volumes/${volumes[0]._id}`)
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

        it('invalid data to patch volume (empty test data)', function (done) {

            request(mock)
                .patch(`/teams/${teams._id}/volumes/${volumes[0]._id}`)
                .send({})
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('try to patch volume without token, and verify the error', function (done) {
            const data = Object.assign(volumes[0], {name: "ChangeName"});

            request(mock)
                .patch(`/teams/${teams._id}/volumes/${volumes[0]._id}`)
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
     * Put volume
     * @depends create volume
     * @description I like to update my volume witch name ChangeName, or change my cpu
     */
    describe('update volume', function () {
        it('put volume with valid data', function (done) {
            const data = Object.assign({}, volumes[0], {name: "ChangeNameWithPut"});

            request(mock)
                .put(`/teams/${teams._id}/volumes/${volumes[0]._id}`)
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
     * Check updates/patchs volume
     * @depends create volume
     * @description I like ensure some effects
     */
    describe('ensure update volume', function () {

        it('ensure my changes', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/volumes/${volumes[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/ChangeNameWithPut/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('ensure if any of my updates/patchs don`t create new volume', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/volumes`)
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
     * @description I like to add new role on my Myvolumes
     */
    describe('e2e teams: add roles', function () {
        it('valid data to add roles', function (done) {
            const data = {role: "3", id: friend._id, refs: "users", name: friend.name, email: friend.email};

            request(mock)
                .post(`/teams/${teams._id}/volumes/${volumes[0]._id}/roles`)
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
                .post(`/teams/${teams._id}/volumes/${volumes[0]._id}/roles`)
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
                .post(`/teams/${teams._id}/volumes/${volumes[0]._id}/roles`)
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
                .post(`/teams/${teams._id}/volumes/${volumes[0]._id}/roles`)
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
                .get(`/teams/${teams._id}/volumes/${volumes[0]._id}`)
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
     * @description I like to update the role volumes role
     */
    describe('update roles', function () {
        it('Exist roles - update role volume', function (done) {
            request(mock)
                .put(`/teams/${teams._id}/volumes/${volumes[0]._id}/roles`)
                .send(volumes[0].roles)
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/users/)
                .expect(function (res) {
                    volumes[0]['roles'] = res.body.items
                    expect(res.body.items).to.have.length(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('update role volume without token', function (done) {
            request(mock)
                .put(`/teams/${teams._id}/volumes/${volumes[0]._id}/roles`)
                .send(volumes[0].roles)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('update roles add new role and update all of them', function () {
        it('Exist roles - update role volume, add new role', function (done) {
            let roles = volumes[0].roles
            roles.push({role: 3, refs: 'organization'});

            request(mock)
                .put(`/teams/${teams._id}/volumes/${volumes[0]._id}/roles`)
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
        it('Exist roles - update role volume', function (done) {
            request(mock)
                .put(`/teams/${teams._id}/volumes/${volumes[0]._id}/roles/${friend._id}`)
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

        it('update single role volume without token', function (done) {
            request(mock)
                .put(`/teams/${teams._id}/volumes/${volumes[0]._id}/roles/${friend._id}`)
                .send({role: "1", refs: "users", name: friend.name, email: friend.email})
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure update roles', function () {
        it('Exist roles - ensure my news volumes', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/volumes/${volumes[0]._id}`)
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
     * @depends create volume
     * @description I have SecondApp, and ai like to delete on role
     */
    describe('delete roles', function () {
        it('Exist roles - delete role', function (done) {
            request(mock)
                .delete(`/teams/${teams._id}/volumes/${volumes[0]._id}/roles/${friend._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist roles - delete role without token', function (done) {
            request(mock)
                .delete(`/teams/${teams._id}/volumes/${volumes[0]._id}/roles/${friend._id}`)
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
                .get(`/teams/${teams._id}/volumes/${volumes[0]._id}`)
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
    =========================================================== delete volumes
     */

    /**
     *
     * Delete volumes
     * @depends create 2
     * @description I have 2 volumes, i like to delete Secondvolume.
     */
    describe('delete volume', function () {
        it('Exist roles - delete my volume', function (done) {
            request(mock)
                .delete(`/teams/${teams._id}/volumes/${volumes[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure to delete volume', function () {
        it('Exist roles - delete my volume', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/volumes/`)
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
