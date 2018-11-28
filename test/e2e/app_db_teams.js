'use strict';
require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    request = require('supertest'),
    cleaner_db = require('./libs/cleaner_db'),
    {expect} = chai,
    _ = require('lodash');


describe('e2e applications', function () {

    let app, mock;

    let user = {
        name: "MaestroUsers",
        email: "maestro@maestrousers.com",
        newemail: "mynew@mail.com",
        password: "mytester",
        token: null,
        _id: null
    };

    let applications = [{
        name: "MyOracleDB",
        status: "Active",
        types: "Application",
        crs_version: "12554872",
        modal: "oracle",
        storage_types: "Default Disk",
        description: "My app description",
        system: [{name: "system2", _id: "5a3a9fca7e16b447e4e24e22"}],
        servers: ['5a3a9ffd9f704b40e45f93cc'],
        datacenters: {
            name: "AWS - Base",
            _id: "5a3abbce66cc383cbc8e1282",
            zone: ["us-east-1a", "us-east-1b"]
        },
        own: 1,
        provider: "Oracle Database",
        environment: "Production",
        family: "Database",
        tags: [{key: 'Tager', value: 'ValueTager'}],
        cdbs: [{name: "CDB names"}],
        role: {
            sga: 12,
            pga: 12,
            endpoint: "http://google.com",
            version: 12,
            patch: 12,
            port: 1222,
            unique: "sadsad",
            dns: "sdsada",
            tns: "asdsa",
            extra_config: "dasdasda"
        }
    }, {
        name: "MyMySQL",
        status: "Stopped",
        crs_version: "12554872",
        modal: "mysql",
        description: "My app description",
        system: [{name: "system2", _id: "5a3a9fca7e16b447e4e24e22"}],
        servers: ['5a3a9ffd9f704b40e45f93cc'],
        datacenters: {
            name: "AWS - Base",
            _id: "5a3abbce66cc383cbc8e1282",
            zone: ["us-east-1a", "us-east-1b"]
        },
        own: 1,
        provider: "Oracle MySQL",
        environment: "Development",
        family: "Database",
        tags: [{key: 'Tager', value: 'ValueTager'}],
        role: {
            endpoint: "http://google.com",
            version: 12,
            patch: 12,
            port: 1222,
            extra_config: "dasdasda"
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
        cleaner_db([{tb: 'users'}, {tb: 'applications'}, {tb: 'teams'}], () => {
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
     * Create application
     * @depends create user
     * @description I like to create a new application
     */
    describe('create application', function () {
        it('create application - create application', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/applications`)
                .send(applications[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/MyOracleDB/)
                .expect(/12554872/)
                .expect(/oracle/)
                .expect(/modal/)
                .expect(/storage_types/)
                .expect(/Default\ Disk/)
                .expect(/system2/)
                .expect(/datacenters/)
                .expect(/5a3abbce66cc383cbc8e1282/)
                .expect(/system2/)
                .expect(/zone/)
                .expect(/Oracle\ Database/)
                .expect(/Production/)
                .expect(/Database/)
                .expect(/Tager/)
                .expect(/sga/)
                .expect(/pga/)
                .expect(/endpoint/)
                .expect(/version/)
                .expect(/patch/)
                .expect(/port/)
                .expect(/unique/)
                .expect(/dns/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create application - create application without token', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/applications`)
                .send(applications[0])
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create application - create second application', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/applications`)
                .send(applications[1])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/MyMySQL/)
                .expect(/Stopped/)
                .expect(/_id/)
                .expect(res => !res.hasOwnProperty('thisFieldMustnApper'))
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create application - validate fail', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/applications`)
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
     * Get applications
     * @depends create application
     * @description I like to see my news applications
     */
    describe('read application', function () {
        it('list my application', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/applications`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/MyOracleDB/)
                .expect(/12554872/)
                .expect(/oracle/)
                .expect(/modal/)
                .expect(/storage_types/)
                .expect(/Default\ Disk/)
                .expect(/system2/)
                .expect(/datacenters/)
                .expect(/5a3abbce66cc383cbc8e1282/)
                .expect(/system2/)
                .expect(/zone/)
                .expect(/Oracle\ Database/)
                .expect(/Production/)
                .expect(/Database/)
                .expect(/Tager/)
                .expect(/endpoint/)
                .expect(/version/)
                .expect(/patch/)
                .expect(/port/)
                .expect(/unique/)
                .expect(/dns/)
                .expect(/_id/)
                .expect(/_link/)
                .expect(/found/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(2);
                })
                .expect(function (res) {
                    Object.assign(applications[0], res.body.items[0]);
                    Object.assign(applications[1], res.body.items[1]);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('count my applications', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/applications/count`)
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

        it('list my application without token', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/applications`)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('list my application with filter', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/applications`)
                .query({name: applications[1].name})
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/MyOracleDB/)
                .expect(/12554872/)
                .expect(/oracle/)
                .expect(/modal/)
                .expect(/storage_types/)
                .expect(/Default\ Disk/)
                .expect(/system2/)
                .expect(/datacenters/)
                .expect(/5a3abbce66cc383cbc8e1282/)
                .expect(/system2/)
                .expect(/zone/)
                .expect(/Oracle\ Database/)
                .expect(/Production/)
                .expect(/Database/)
                .expect(/Tager/)
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
                .get(`/teams/${teams._id}/applications`)
                .query({limit: 1, page: 2})
                .expect(/MyOracleDB/)
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

        it('Exist applications - test pagination list', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/applications`)
                .query({limit: 1, page: 40})
                .set('Authorization', `JWT ${user.token}`)
                .expect(404)
                .expect(/not found/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('see my new application', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/applications/${applications[1]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/MyOracleDB/)
                .expect(/system2/)
                .expect(/tags/)
                .expect(/AWS/)
                .expect(/_link/)
                .expect(function (res) {
                    let roles = res.body['roles'].map(e => _.omit(e, ['_links']));
                    Object.assign(applications[0], {roles});
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


        it('see my new application without token', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/applications/${applications[0]._id}`)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('autocomplete', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/applications/`)
                .query({query: '{"name": "applications"}'})
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('autocomplete - not found', function (done) {
            request(mock)
                .get("/applications/")
                .query({query: '{"name": "notfuond"}'})
                .set('Authorization', `JWT ${user.token}`)
                .expect(e => e.text.found == 0)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


        it('autocomplete without token', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/applications/autocomplete`)
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
     * Patch application
     * @depends create application
     * @description I like to update my application witch name ChangeName, or add some services/auth/tags
     */
    describe('patch application', function () {
        it('patch application, changing name', function (done) {
            const data = Object.assign(applications[0], {name: "ChangeName"});

            request(mock)
                .patch(`/teams/${teams._id}/applications/${applications[0]._id}`)
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

        it('patch application add new tag (newTag, myvalue)', function (done) {
            let data = Object.assign({}, applications[0]);
            data['tags'].push({key: 'newTag', value: 'myValue'});

            request(mock)
                .patch(`/teams/${teams._id}/applications/${applications[0]._id}`)
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

        it('invalid data to patch application (empty test data)', function (done) {

            request(mock)
                .patch(`/teams/${teams._id}/applications/${applications[0]._id}`)
                .send({})
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('try to patch application without token, and verify the error', function (done) {
            const data = Object.assign(applications[0], {name: "ChangeName"});

            request(mock)
                .patch(`/teams/${teams._id}/applications/${applications[0]._id}`)
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
     * Put application
     * @depends create application
     * @description I like to update my application witch name ChangeName, or change my cpu
     */
    describe('update application', function () {
        it('put application with valid data', function (done) {
            const data = Object.assign(applications[0], {name: "ChangeNameWithPut"});

            request(mock)
                .put(`/teams/${teams._id}/applications/${applications[0]._id}`)
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
     * Check updates/patchs application
     * @depends create application
     * @description I like ensure some effects
     */
    describe('ensure update application', function () {

        it('ensure my changes', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/applications/${applications[0]._id}`)
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

        it('ensure if any of my updates/patchs don`t create new application', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/applications`)
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
     * @description I like to add new role on my Myapplications
     */
    describe('e2e teams: add roles', function () {
        it('valid data to add roles', function (done) {
            const data = {role: "3", id: friend._id, refs: "users", name: friend.name, email: friend.email};

            request(mock)
                .post(`/teams/${teams._id}/applications/${applications[0]._id}/roles`)
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
                .post(`/teams/${teams._id}/applications/${applications[0]._id}/roles`)
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
                .post(`/teams/${teams._id}/applications/${applications[0]._id}/roles`)
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
                .post(`/teams/${teams._id}/applications/${applications[0]._id}/roles`)
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
                .get(`/teams/${teams._id}/applications/${applications[0]._id}`)
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
     * @description I like to update the role applications role
     */
    describe('update roles', function () {
        it('Exist roles - update role application', function (done) {
            request(mock)
                .put(`/teams/${teams._id}/applications/${applications[0]._id}/roles`)
                .send(applications[0].roles)
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/users/)
                .expect(function (res) {
                    applications[0]['roles'] = res.body.items;
                    expect(res.body.items).to.have.length(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('update role application without token', function (done) {
            request(mock)
                .put(`/teams/${teams._id}/applications/${applications[0]._id}/roles`)
                .send(applications[0].roles)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('update roles add new role and update all of them', function () {
        it('Exist roles - update role application, add new role', function (done) {
            let roles = applications[0].roles;
            roles.push({role: 3, refs: 'organization'});

            request(mock)
                .put(`/teams/${teams._id}/applications/${applications[0]._id}/roles`)
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
        it('Exist roles - update role application', function (done) {
            request(mock)
                .put(`/teams/${teams._id}/applications/${applications[0]._id}/roles/${friend._id}`)
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

        it('update single role application without token', function (done) {
            request(mock)
                .put(`/teams/${teams._id}/applications/${applications[0]._id} + "/roles/" + friend._id`)
                .send({role: "1", refs: "users", name: friend.name, email: friend.email})
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure update roles', function () {
        it('Exist roles - ensure my news applications', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/applications/${applications[0]._id}`)
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
     * @depends create application
     * @description I have SecondApp, and ai like to delete on role
     */
    describe('delete roles', function () {
        it('Exist roles - delete role', function (done) {
            request(mock)
                .delete(`/teams/${teams._id}/applications/${applications[0]._id}/roles/${friend._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist roles - delete role without token', function (done) {
            request(mock)
                .delete(`/teams/${teams._id}/applications/${applications[0]._id} + "/roles/" + friend._id`)
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
                .get(`/teams/${teams._id}/applications/${applications[0]._id}`)
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
    =========================================================== delete applications
     */

    /**
     *
     * Delete applications
     * @depends create 2
     * @description I have 2 applications, i like to delete Secondapplication.
     */
    describe('delete application', function () {
        it('Exist roles - delete my application', function (done) {
            request(mock)
                .delete(`/teams/${teams._id}/applications/${applications[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure to delete application', function () {
        it('Exist roles - delete my application', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/applications/`)
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
