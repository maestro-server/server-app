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

    let datacenters = [{
        name: "Mydatacenter",
        regions: ["us-east"],
        zones: ["us-virginia-1a", "sp-virginia-1b"],
        provider: "AWS"
    }];

    let connections = [{
        name: "Myconnection",
        dc: "AWS - OTB",
        dc_id: "5a3a8b82fe024f38804b3675",
        regions: ["us-east"],
        provider: "AWS",
        conn: {
            access: "aaccess",
            secret: "asecret"
        }
    }, {
        name: "MyOpensatckconnection",
        dc: "OpenStack - OTB",
        dc_id: "5a3a8b82fe024f38804b3675",
        regions: ["br-east"],
        provider: "AWS",
        project: "br-sp1",
        url: "keystone-url",
        conn: {
            username: "aaccess",
            password: "asecret"
        },
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
        cleaner_db([{tb: 'users'}, {tb: 'connections'}, {tb: 'schedulers'}, {tb: 'adminer'}, {tb: 'datacenters'}], () => {
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
     * Create datacenter
     * @depends create user
     * @description I like to create a new datacenter to link with my connection
     */

    describe('create datacenter', function () {
        it('create datacenter - create datacenter', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/datacenters`)
                .send(datacenters[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/Mydatacenter/)
                .expect(/zones/)
                .expect(/regions/)
                .expect(/us-east/)
                .expect(/AWS/)
                .expect(/_id/)
                .expect(res=> datacenters[0] = res.body)
                .expect(res=> connections[0]['dc_id'] = res.body._id)
                .expect(res=> connections[1]['dc_id'] = res.body._id)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });


    /**
     *
     * Create connection
     * @depends create user
     * @description I like to create a new connection
     */
    describe('create connection', function () {
        it('create connection - create connection', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/connections`)
                .send(connections[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create connection - create connection without token', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/connections`)
                .send(connections[0])
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create connection - create second connection', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/connections`)
                .send(connections[1])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(res => !res.hasOwnProperty('thisFieldMustnApper'))
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create connection - validate fail', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/connections`)
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
     * Get connections
     * @depends create connection
     * @description I like to see my news connections
     */
    describe('read connection', function () {
        it('list my connection', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/connections`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/Myconnection/)
                .expect(/dc/)
                .expect(/dc_id/)
                .expect(/regions/)
                .expect(/conn/)
                .expect(/AWS - OTB/)
                .expect(/_id/)
                .expect(/_link/)
                .expect(/found/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(2);
                })
                .expect(function (res) {
                    Object.assign(connections[0], res.body.items[0]);
                    Object.assign(connections[1], res.body.items[1]);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('count my connections', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/connections/count`)
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

        it('list my connection without token', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/connections`)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('list my connection with filter', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/connections`)
                .query({name: connections[0].name})
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
                .get(`/teams/${teams._id}/connections`)
                .query({limit: 1, page: 2})
                .expect(/Myconnection/)
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

        it('Exist connections - test pagination list', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/connections`)
                .query({limit: 1, page: 40})
                .set('Authorization', `JWT ${user.token}`)
                .expect(404)
                .expect(/not found/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('see my new connection - OpenStack', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/connections/${connections[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .expect(/_link/)
                .expect(function (res) {
                    var conn = res.body['conn']
                    var decoded = jwt.decode(conn, process.env.MAESTRO_SECRETJWT);
                    expect(decoded).to.deep.equal({ username: 'aaccess', password: 'asecret' });
                })
                .expect(function (res) {
                    let roles = res.body['roles'].map(e=>_.omit(e, ['_links']))
                    Object.assign(connections[0], {roles});
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('see my new connection - AWS', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/connections/${connections[1]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .expect(/_link/)
                .expect(function (res) {
                    var conn = res.body['conn']
                    var decoded = jwt.decode(conn, process.env.MAESTRO_SECRETJWT);
                    expect(decoded).to.deep.equal({ access: 'aaccess', secret: 'asecret' });
                })
                .expect(function (res) {
                    let roles = res.body['roles'].map(e=>_.omit(e, ['_links']))
                    Object.assign(connections[1], {roles});
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('see my new connection without token', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/connections/${connections[0]._id}`)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('autocomplete', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/connections/`)
                .query({query: "{'name': 'connection'}"})
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('autocomplete - not found', function (done) {
            request(mock)
                .get("/connections/")
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
                .get(`/teams/${teams._id}/connections/autocomplete`)
                .query({complete: "second"})
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('list my schedulers', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/scheduler`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/server-list/)
                .expect(/found/)
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
     * Patch connection
     * @depends create connection
     * @description I like to update my connection witch name ChangeName, or add some services/auth/tags
     */
    describe('patch connection', function () {
        it('patch connection, changing name', function (done) {
            const data = Object.assign(connections[0], {name: "ChangeName"});

            request(mock)
                .patch(`/teams/${teams._id}/connections/${connections[0]._id}`)
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

        it('invalid data to patch connection (empty test data)', function (done) {

            request(mock)
                .patch(`/teams/${teams._id}/connections/${connections[0]._id}`)
                .send({})
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('try to patch connection without token, and verify the error', function (done) {
            const data = Object.assign(connections[0], {name: "ChangeName"});

            request(mock)
                .patch(`/teams/${teams._id}/connections/${connections[0]._id}`)
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
     * Put connection
     * @depends create connection
     * @description I like to update my connection witch name ChangeName, or change my cpu
     */
    describe('update connection', function () {
        it('put connection with valid data', function (done) {
            const data = Object.assign(connections[0], {name: "ChangeNameWithPut"});

            request(mock)
                .put(`/teams/${teams._id}/connections/${connections[0]._id}`)
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
     * Check updates/patchs connection
     * @depends create connection
     * @description I like ensure some effects
     */
    describe('ensure update connection', function () {

        it('ensure my changes', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/connections/${connections[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/ChangeNameWithPut/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('ensure if any of my updates/patchs don`t create new connection', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/connections`)
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
     * @description I like to add new role into my Myconnections
     */
    describe('e2e teams: add roles', function () {
        it('valid data to add roles', function (done) {
            const data = {role: "3", id: friend._id, refs: "users", name: friend.name, email: friend.email};

            request(mock)
                .post(`/teams/${teams._id}/connections/${connections[0]._id}/roles`)
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
                .post(`/teams/${teams._id}/connections/${connections[0]._id}/roles`)
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
                .post(`/teams/${teams._id}/connections/${connections[0]._id}/roles`)
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
                .post(`/teams/${teams._id}/connections/${connections[0]._id}/roles`)
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
                .get(`/teams/${teams._id}/connections/${connections[0]._id}`)
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
     * @description I like to update the role connections role
     */
    describe('update roles', function () {
        it('Exist roles - update role connection', function (done) {
            request(mock)
                .put(`/teams/${teams._id}/connections/${connections[0]._id}/roles`)
                .send(connections[0].roles)
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/users/)
                .expect(function (res) {
                    connections[0]['roles'] = res.body.items
                    expect(res.body.items).to.have.length(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('update role connection without token', function (done) {
            request(mock)
                .put(`/teams/${teams._id}/connections/${connections[0]._id}/roles`)
                .send(connections[0].roles)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('update roles add new role and update all of them', function () {
        it('Exist roles - update role connection, add new role', function (done) {
            let roles = connections[0].roles
            roles.push({role: 3, refs: 'organization'});

            request(mock)
                .put(`/teams/${teams._id}/connections/${connections[0]._id}/roles`)
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
        it('Exist roles - update role connection', function (done) {
            request(mock)
                .put(`/teams/${teams._id}/connections/${connections[0]._id}/roles/${friend._id}`)
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

        it('update single role connection without token', function (done) {
            request(mock)
                .put(`/teams/${teams._id}/connections/${connections[0]._id}/roles/${friend._id}`)
                .send({role: "1", refs: "users", name: friend.name, email: friend.email})
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure update roles', function () {
        it('Exist roles - ensure my news connections', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/connections/${connections[0]._id}`)
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
     * @depends create connection
     * @description I have SecondApp, and ai like to delete on role
     */
    describe('delete roles', function () {
        it('Exist roles - delete role', function (done) {
            request(mock)
                .delete(`/teams/${teams._id}/connections/${connections[0]._id}/roles/${friend._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist roles - delete role without token', function (done) {
            request(mock)
                .delete(`/teams/${teams._id}/connections/${connections[0]._id}/roles/${friend._id}`)
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
                .get(`/teams/${teams._id}/connections/${connections[0]._id}`)
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
    =========================================================== delete connections
     */

    /**
     *
     * Delete connections
     * @depends create 2
     * @description I have 2 connections, i like to delete Secondconnection.
     */
    describe('delete connection', function () {
        it('Exist roles - delete my connection', function (done) {
            request(mock)
                .delete(`/teams/${teams._id}/connections/${connections[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)

                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure to delete connection', function () {
        it('Exist roles - delete my connection', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/connections/`)
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

        it('ensure to delete my schedulers', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/scheduler/`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/found/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(1);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('delete my second connection', function () {
        it('Exist roles - delete my connection', function (done) {
            request(mock)
                .delete(`/teams/${teams._id}/connections/${connections[1]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure if my connection is deleted', function () {
        it('Exist roles - delete my connection', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/connections/`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(0);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


        it('ensure if my datacenters is disconnected', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/datacenters/${datacenters[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .expect(/sucessed/)
                .expect(res => expect(res.body.sucessed).to.equal(false))
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });



});
