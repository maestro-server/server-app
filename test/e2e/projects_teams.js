'use strict';
require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    request = require('supertest'),
    cleaner_db = require('./libs/cleaner_db'),
    {expect} = chai;

describe('e2e projects', function () {

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

    let projects = [{
        name: "MyProject"
    }, {
        name: "SecondProject"
    }];

    let teams = {
        name: "MyTeam"
    };

    let teamsAPP = [{
        name: "MyprojectT"
    }, {
        name: "SecondprojectT"
    }];

    before(function (done) {
        cleaner_db([{tb: 'users'}, {tb: 'projects'}, {tb: 'teams'}], () => {
            app = require('./libs/bootApp')();

            app.once('start', done);
            mock = app.listen(1344);
        }, null);
    });

    after(function (done) {
        mock.close(done);
    });


    describe('e2e users: create new user', function () {
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

    describe('e2e users: get token', function () {
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

    describe('create team project', function () {
        it('Create team project - create team project', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/projects`)
                .send(teamsAPP[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/MyprojectT/)
                .expect(/teams/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


        it('Create team project - create second project', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/projects`)
                .send(teamsAPP[1])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

    });

    /**
     *
     * Get projects
     * @depends create project
     * @description I like to see my news projects
     */
    describe('read team project', function () {
        it('Exist project - list my project', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/projects`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/\"name\":\"MyprojectT\"/)
                .expect(/_id/)
                .expect(function (res) {
                    expect(res.body.items).to.have.length(2);
                })
                .expect(function (res) {
                    Object.assign(teamsAPP[0], res.body.items[0]);
                    Object.assign(teamsAPP[1], res.body.items[1]);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team project - list my project without token', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/projects`)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team project - list my project with filter', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/projects`)
                .query({name: teamsAPP[0].name})
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

        it('Exist team project - test pagination list', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/projects`)
                .query({limit: 1, page: 2})
                .expect(/Myproject/)
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

        it('Exist team project - see my new project', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/projects/${teamsAPP[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/name/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team project - see my new project without token', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/projects/${teamsAPP[0]._id}`)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    /**
     *
     * Update project
     * @depends create project
     * @description I like to update my project witch name ChangeName
     */
    describe('update team project', function () {
        it('Exist team project - update project with valid data', function (done) {
            const data = Object.assign(teamsAPP[0], {name: "ChangeName"});

            request(mock)
                .patch(`/teams/${teams._id}/projects/${teamsAPP[0]._id}`)
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

        it('Exist team project - invalid data to update project', function (done) {

            request(mock)
                .patch(`/teams/${teams._id}/projects/${teamsAPP[0]._id}`)
                .send({})
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team project - try to update project withou token', function (done) {
            const data = Object.assign(teamsAPP[0], {name: "ChangeName"});

            request(mock)
                .patch(`/teams/${teams._id}/projects/${teamsAPP[0]._id}`)
                .send(data)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure team update project', function () {

        it('Exist team project - ensure my changes', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/projects/${teamsAPP[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/ChangeName/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team project - ensure if my update don`t create new project', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/projects`)
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


    /**
     *
     * Create roles
     * @depends create team roles
     * @description I like to add new role on my Myprojects
     */
    describe('e2e add teams in team: add roles', function () {
        it('valid data to add roles', function (done) {
            const data = {role: "3", id: friend._id, refs: "users", name: friend.name, email: friend.email};

            request(mock)
                .post(`/teams/${teams._id}/projects/${teamsAPP[0]._id}/roles`)
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

        it('Exist team members - invalid data to add roles (miss role)', function (done) {
            request(mock)
                .post(`/teams/${teams._id}/projects/${teamsAPP[0]._id}/roles`)
                .send(friend)
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team members - add roles without token', function (done) {
            const data = {role: "3", id: friend._id, refs: "users"};

            request(mock)
                .post(`/teams/${teams._id}/projects/${teamsAPP[0]._id}/roles`)
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
     * Get roles
     * @depends create roles
     * @description I like to see my roles
     */
    describe('get team roles', function () {
        it('Exist roles - ensure my news roles', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/projects/${teamsAPP[0]._id}`)
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
     * @description I like to update the role projects role
     */
    describe('update teams roles', function () {
        it('Exist roles - update role project', function (done) {
            request(mock)
                .put(`/teams/${teams._id}/projects/${teamsAPP[0]._id}/roles/${friend._id}`)
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

        it('Exist roles - update role application - validation', function (done) {
            request(mock)
                .put(`/teams/${teams._id}/projects/${teamsAPP[0]._id}/roles/${friend._id}`)
                .send({name: friend.name, email: friend.email})
                .set('Authorization', `JWT ${user.token}`)
                .expect(422)
                .expect('Content-Type', /json/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist teams members - update role project without token', function (done) {
            request(mock)
                .put(`/teams/${teams._id}/projects/${teamsAPP[0]._id}/roles/${friend._id}`)
                .send({role: "1", refs: "users", name: friend.name, email: friend.email})
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure team update roles', function () {
        it('Exist roles - ensure my news projects', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/projects/${teamsAPP[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(/Friend/)
                .expect(/\"role\"\:1/)
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
     * Delete roles
     * @depends create project
     * @description I have SecondApp, and ai like to delete on role
     */
    describe('delete team roles', function () {
        it('Exist roles - delete role', function (done) {
            request(mock)
                .delete(`/teams/${teams._id}/projects/${teamsAPP[0]._id}/roles/${friend._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist roles - delete role - wrong id team', function (done) {
            request(mock)
                .delete(`/teams/${teams._id}/projects/${friend._id}/roles/${friend._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(400)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('Exist team roles - delete role without token', function (done) {
            request(mock)
                .delete(`/teams/${teams._id}/projects/${teamsAPP[0]._id}/roles/${friend._id}`)
                .expect(401)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure team delete roles', function () {
        it('Exist roles - ensure my news role', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/projects/${teamsAPP[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    expect(res.body.roles).to.have.length(1);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });


    /**
     *
     * Delete projects
     * @depends create 2
     * @description I have 2 projects, i like to delete Secondproject.
     */
    describe('delete team project', function () {
        it('Exist roles - delete my project', function (done) {
            request(mock)
                .delete(`/teams/${teams._id}/projects/${teamsAPP[0]._id}`)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure team  delete project', function () {
        it('Exist roles - delete my project', function (done) {
            request(mock)
                .get(`/teams/${teams._id}/projects`)
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
