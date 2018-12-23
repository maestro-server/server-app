'use strict';
require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    request = require('supertest'),
    cleaner_db = require('./libs/cleaner_db'),
    {expect} = chai,
    _ = require('lodash')


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

    let servers = [{
        hostname: "Myserver",
        ipv4_private: "127.0.0.1",
        ipv4_public: "127.0.0.1",
        os: {base: 'Linux', dist: 'CentOs', version: "7"},
        cpu: '24',
        memory: '24',
        storage: [{name: '/dev/sda', size: 30, root: "true"}, {name: '/dev/sdb', size: 24}],
        services: [{name: 'Apache', version: '7'}],
        role: 'Application',
        auth: [{name: 'mykey', type: 'PKI', username: 'signorini', key: 'master.pem'}],
        tags: [{key: 'Tager', value: 'ValueTager'}],
    }, {
        hostname: "Secondserver",
        ipv4_private: "127.0.0.4",
        ipv4_public: "127.0.0.4",
        os: {base: 'Windows'},
        role: 'Application',
        thisFieldMustnApper: 'NotApper'
    }];

    let teams = {
        name: "MyTeam"
    };

    let teamsAPP = [{
        name: "MyarchitectureT"
    }, {
        name: "SecondarchitectureT"
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
     * Create server
     * @depends create user
     * @description I like to create a new server
     */
    describe('create server', function () {
        it('create server - create server', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/servers`)
                .send(servers[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/Myserver/)
                .expect(/os/)
                .expect(/cpu/)
                .expect(/memory/)
                .expect(/tags/)
                .expect(/ValueTager/)
                .expect(/Apache/)
                .expect(/master.pem/)
                .expect(/storage/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create server - create server without token', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/servers`)
                .send(servers[0])
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create server - create second server', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/servers`)
                .send(servers[1])
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

        it('create server - validate fail', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/servers`)
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
     * Get servers
     * @depends create server
     * @description I like to see my news servers
     */
    describe('read server', function () {
        it('list my server', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/servers`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"hostname\":\"Myserver\"/)
                .expect(/\"ipv4_private\":\"127.0.0.1\"/)
                .expect(/_id/)
                .expect(/_link/)
                .expect(/found/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(2);
                })
                .expect(function (res) {
                    Object.assign(servers[0], res.body.items[0]);
                    Object.assign(servers[1], res.body.items[1]);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('count my servers', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/servers/count`)
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

        it('list my server without token', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/servers`)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('list my server with filter', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/servers`)
                .query({hostname: servers[0].hostname})
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
                .get(`/teams/${teams._id}/servers`)
                .query({limit: 1, page: 2})
                .expect(/Myserver/)
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

        it('Exist servers - test pagination list', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/servers`)
                .query({limit: 1, page: 40})
                .set('Authorization', `JWT ${user.token}`)
                .expect(404)
                .expect(/not found/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('see my new server', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/servers/${servers[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .expect(/_link/)
                .expect(function (res) {
                    let roles = res.body['roles'].map(e=>_.omit(e, ['_links']))
                    Object.assign(servers[0], {roles});
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


        it('see my new server without token', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/servers/${servers[0]._id}`)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('autocomplete', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/servers/`)
                .query({query: "{'hostname': 'server'}"})
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('autocomplete - not found', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/servers/`)
                .query({query: '{"hostname": "notfuond"}'})
                .set('Authorization', `JWT ${user.token}`)
                .expect(e=> e.text.found == 0)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


        it('autocomplete without token', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/servers/autocomplete`)
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
     * Patch server
     * @depends create server
     * @description I like to update my server witch name ChangeName, or add some services/auth/tags
     */
    describe('patch server', function () {
        it('patch server, changing hostname', function (done) {
            const data = Object.assign(servers[0], {hostname: "ChangeName"});

            request(mock)
                .patch(`/teams/${teams._id}/servers/${servers[0]._id}`)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(202)
                .expect('Content-Type', /json/)
                .expect(/\"hostname\":\"ChangeName\"/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('patch server add one storage', function (done) {
            let data = Object.assign({}, servers[0]);
            data['storage'].push({name: '/dev/sdx', size: 100});

            request(mock)
                .patch(`/teams/${teams._id}/servers/${servers[0]._id}`)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(202)
                .expect('Content-Type', /json/)
                .expect(/storage/)
                .expect(/\/dev\/sdx/)
                .expect(function (res) {
                    expect(res.body['storage']).to.have.length(3);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('patch server add new invalidate storage (outherTag key)', function (done) {
            let data = _.cloneDeep(servers[0]);
            data['storage'].push({outherKey: 'email', value: "valuee"});

            request(mock)
                .patch(`/teams/${teams._id}/servers/${servers[0]._id}`)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('patch server add one service (Monitoring 2.3)', function (done) {
            let data = Object.assign({}, servers[0]);
            data['services'].push({name: 'Monitoring', version: '2.3'});

            request(mock)
                .patch(`/teams/${teams._id}/servers/${servers[0]._id}`)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(202)
                .expect('Content-Type', /json/)
                .expect(/services/)
                .expect(/Monitoring/)
                .expect(/2.3/)
                .expect(function (res) {
                    expect(res.body['services']).to.have.length(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('patch server add new invalidate services (outherTag key)', function (done) {
            let data = _.cloneDeep(servers[0]);
            data['tags'].push({outherKey: 'email', value: "valuee"});

            request(mock)
                .patch(`/teams/${teams._id}/servers/${servers[0]._id}`)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('patch server add new auth (ldap, suprisekey)', function (done) {
            let data = Object.assign({}, servers[0]);
            data['auth'].push({name: 'supriseKey', type: 'LDAP', username: 'ldapp'});

            request(mock)
                .patch(`/teams/${teams._id}/servers/${servers[0]._id}`)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(202)
                .expect('Content-Type', /json/)
                .expect(/auth/)
                .expect(/supriseKey/)
                .expect(/LDAP/)
                .expect(/ldapp/)
                .expect(function (res) {
                    expect(res.body['auth']).to.have.length(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('patch server add new invalidate auth (outherTag key)', function (done) {
            let data = _.cloneDeep(servers[0]);
            data['auth'].push({outherKey: 'email', value: "valuee"});

            request(mock)
                .patch(`/teams/${teams._id}/servers/${servers[0]._id}`)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('patch server add new tag (newTag, myvalue)', function (done) {
            let data = Object.assign({}, servers[0]);
            data['tags'].push({key: 'newTag', value: 'myValue'});

            request(mock)
                .patch(`/teams/${teams._id}/servers/${servers[0]._id}`)
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

        it('patch server add new invalidate tags (outherTag key)', function (done) {
            let data = _.cloneDeep(servers[0]);
            data['tags'].push({outherKey: 'email', value: "valuee"});

            request(mock)
                .patch(`/teams/${teams._id}/servers/${servers[0]._id}`)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('invalid data to patch server (empty test data)', function (done) {

            request(mock)
                .patch(`/teams/${teams._id}/servers/${servers[0]._id}`)
                .send({})
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('try to patch server without token, and verify the error', function (done) {
            const data = Object.assign(servers[0], {name: "ChangeName"});

            request(mock)
                .patch(`/teams/${teams._id}/servers/${servers[0]._id}`)
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
     * Put server
     * @depends create server
     * @description I like to update my server witch name ChangeName, or change my cpu
     */
    describe('update server', function () {
        it('put server with valid data', function (done) {
            const data = Object.assign(servers[0], {hostname: "ChangeNameWithPut"});

            request(mock)
                .put(`/teams/${teams._id}/servers/${servers[0]._id}`)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(202)
                .expect('Content-Type', /json/)
                .expect(/\"hostname\":\"ChangeNameWithPut\"/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    /**
     *
     * Check updates/patchs server
     * @depends create server
     * @description I like ensure some effects
     */
    describe('ensure update server', function () {

        it('ensure my changes', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/servers/${servers[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/ChangeNameWithPut/)
                .expect(/newTag/)
                .expect(/LDAP/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('ensure if any of my updates/patchs don`t create new server', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/servers`)
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
     * @description I like to add new role on my Myservers
     */
    describe('e2e teams: add roles', function () {
        it('valid data to add roles', function (done) {
            const data = {role: "3", id: friend._id, refs: "users", name: friend.name, email: friend.email};

            request(mock)
                .post(`/teams/${teams._id}/servers/${servers[0]._id}/roles`)
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
                .post(`/teams/${teams._id}/servers/${servers[0]._id}/roles`)
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
                .post(`/teams/${teams._id}/servers/${servers[0]._id}/roles`)
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
                .post(`/teams/${teams._id}/servers/${servers[0]._id}/roles`)
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
                .get(`/teams/${teams._id}/servers/${servers[0]._id}`)
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
     * @description I like to update the role servers role
     */
    describe('update roles', function () {
        it('Exist roles - update role server', function (done) {
            request(mock)
                .put(`/teams/${teams._id}/servers/${servers[0]._id}/roles`)
                .send(servers[0].roles)
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/teams/)
                .expect(function (res) {
                    servers[0]['roles'] = res.body.items
                    expect(res.body.items).to.have.length(1);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('update role server without token', function (done) {
            request(mock)
                .put(`/teams/${teams._id}/servers/${servers[0]._id}/roles`)
                .send(servers[0].roles)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('update roles add new role and update all of them', function () {
        it('Exist roles - update role server, add new role', function (done) {
            let roles = servers[0].roles
            roles.push({role: 3, refs: 'organization'});

            request(mock)
                .put(`/teams/${teams._id}/servers/${servers[0]._id}/roles`)
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
        it('Exist roles - update role server', function (done) {
            request(mock)
                .put(`/teams/${teams._id}/servers/${servers[0]._id}/roles/${friend._id}`)
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

        it('update single role server without token', function (done) {
            request(mock)
                .put(`/teams/${teams._id}/servers/${servers[0]._id}/roles/${friend._id}`)
                .send({role: "1", refs: "users", name: friend.name, email: friend.email})
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure update roles', function () {
        it('Exist roles - ensure my news servers', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/servers/${servers[0]._id}`)
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
     * @depends create server
     * @description I have SecondApp, and ai like to delete on role
     */
    describe('delete roles', function () {
        it('Exist roles - delete role', function (done) {
            request(mock)
                .delete(`/teams/${teams._id}/servers/${servers[0]._id}/roles/${friend._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist roles - delete role without token', function (done) {
            request(mock)
                .delete(`/teams/${teams._id}/servers/${servers[0]._id}/roles/${friend._id}`)
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
                .get(`/teams/${teams._id}/servers/${servers[0]._id}`)
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
    =========================================================== delete servers
     */

    /**
     *
     * Delete servers
     * @depends create 2
     * @description I have 2 servers, i like to delete Secondserver.
     */
    describe('delete server', function () {
        it('Exist roles - delete my server', function (done) {
            request(mock)
                .delete(`/teams/${teams._id}/servers/${servers[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure to delete server', function () {
        it('Exist roles - delete my server', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/servers/`)
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
