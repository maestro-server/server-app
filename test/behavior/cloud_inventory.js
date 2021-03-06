'use strict';
require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    request = require('supertest'),
    cleaner_db = require('./libs/cleaner_db'),
    {expect} = chai,
    _ = require('lodash');


describe('behaviors basic actions in cloud inventory', function () {

    let app, mock;

    let user = {
        name: "MaestroUsers",
        email: "maestro@maestrousers.com",
        newemail: "mynew@mail.com",
        password: "mytester",
        token: null,
        _id: null
    };

    let servers = [{
        name: "Myserver",
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
        name: "Myserver",
        hostname: "Secondserver",
        ipv4_private: "127.0.0.4",
        ipv4_public: "127.0.0.4",
        os: {base: 'Windows'},
        role: 'Application',
        thisFieldMustnApper: 'NotApper'
    }];

    let applications = [{
        name: "Myapplication",
        description: "My app description",
        system: [],
        own: 1,
        role: {
            role: "Application",
            endpoint: "http://endpoint.com",
            path: "bin/bash",
            command: "java -jar",
            description: "description"
        },
        language: "Nodejs",
        provider: "AWS",
        family: "Application",
        tags: [{key: 'Tager', value: 'ValueTager'}]
    }, {
        name: "MySecondeapplication",
        description: "My app description",
        role: {role: 'Application'},
        family: "DNS",
        thisFieldMustnApper: 'NotApper'
    }];

    let datacenters = [{
        name: "Mydatacenter",
        regions: ["us-virginia", "sp-virginia"],
        zones: ["us-virginia-1a", "sp-virginia-1b"],
        provider: "AWS"
    }, {
        name: "MySeconddatacenter",
        regions: ["glete", "tambore"],
        zones: ["br-sp-1a", "br-sp-1b"],
        provider: "OpenStack",
        thisFieldMustnApper: 'NotApper'
    }];

    let system = [{
        name: "Firstsystem",
        description: "Description of my system",
        clients: [],
        check: [{key: 'Checker', value: 'ValueChecker'}],
        tags: [{key: 'Tager', value: 'ValueTager'}]
    }, {
        name: "Secondsystem",
        description: "Description of my system",
        thisFieldMustnApper: 'NotApper'
    }];

    let clients = [{
        name: "Myclient",
        description: "My client description",
        contacts: [{channel: "HipChat", value: "TeamHipchat"}],
        tags: [{key: 'Tager', value: 'ValueTager'}],
    }, {
        name: "MySeconbdclient",
        email: "mysecondclient@client.com",
        description: "My second client description",
    }];

    let connections = [{
        name: "Myconnection",
        dc: "AWS - OTB",
        dc_id: "5a3a8b82fe024f38804b3675",
        regions: ["us-east"],
        provider: "AWS",
        service: "AWS",
        conn: {
            access: "aaccess",
            secret: "asecret"
        }
    }, {
        name: "MyOpensatckconnection",
        dc: "OpenStack - OTB",
        dc_id: "5a3a8b82fe024f38804b3675",
        regions: ["br-east"],
        provider: "Openstack",
        service: "Openstack",
        project: "br-sp1",
        url: "keystone-url",
        conn: {
            username: "aaccess",
            password: "asecret"
        },
        thisFieldMustnApper: 'NotApper'
    }];


    before(function (done) {
        cleaner_db([{tb: 'users'}, {tb: 'servers'}, {tb: 'applications'},
            {tb: 'datacenters'}, {tb: 'clients'}, {tb: 'systems'}], () => {
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
     * Create my env servers
     * @depends create user
     * @description I like to create mys env servers, apps, clients and etc
     */
    describe('create servers', function () {
        it('create my first server', function (done) {
            request(mock)
                .post('/servers')
                .send(servers[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/_id/)
                .expect(function (res) {
                    Object.assign(servers[0], res.body);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create my second server', function (done) {
            request(mock)
                .post('/servers')
                .send(servers[1])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/_id/)
                .expect(function (res) {
                    Object.assign(servers[1], res.body);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create my first app', function (done) {
            request(mock)
                .post('/applications')
                .send(applications[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/_id/)
                .expect(function (res) {
                    Object.assign(applications[0], res.body);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create my second app', function (done) {
            request(mock)
                .post('/applications')
                .send(applications[1])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/_id/)
                .expect(function (res) {
                    Object.assign(applications[1], res.body);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create my first system', function (done) {
            request(mock)
                .post('/system')
                .send(system[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/_id/)
                .expect(function (res) {
                    Object.assign(system[0], res.body);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create my second system', function (done) {
            request(mock)
                .post('/system')
                .send(system[1])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/_id/)
                .expect(function (res) {
                    Object.assign(system[1], res.body);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create my first clients', function (done) {
            request(mock)
                .post('/clients')
                .send(clients[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/_id/)
                .expect(function (res) {
                    Object.assign(clients[0], res.body);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create my second clients', function (done) {
            request(mock)
                .post('/clients')
                .send(clients[1])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/_id/)
                .expect(function (res) {
                    Object.assign(clients[1], res.body);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


        it('create my first datacenters', function (done) {
            request(mock)
                .post('/datacenters')
                .send(datacenters[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/_id/)
                .expect(function (res) {
                    Object.assign(datacenters[0], res.body);
                })
                .expect(res => connections[0]['dc_id'] = res.body._id)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create my second datacenters', function (done) {
            request(mock)
                .post('/datacenters')
                .send(datacenters[1])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(/_id/)
                .expect(function (res) {
                    Object.assign(datacenters[1], res.body);
                })
                .expect(res => connections[1]['dc_id'] = res.body._id)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create my first connections', function (done) {
            request(mock)
                .post('/connections')
                .send(connections[0])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    Object.assign(connections[0], res.body);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('create my second connections', function (done) {
            request(mock)
                .post('/connections')
                .send(connections[1])
                .set('Authorization', `JWT ${user.token}`)
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    Object.assign(connections[1], res.body);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    /**
     *
     * Make some relations
     * @depends create user
     * @description Create relations
     */
    describe('relations', function () {

        it('put one app on server - server way', function (done) {
            let data = Object.assign(servers[0], {
                'applications': [
                    _.pick(applications[0], ['_id', 'name', 'family']),
                    _.pick(applications[1], ['_id', 'name', 'family'])
                ]
            });

            request(mock)
                .put('/servers/' + servers[0]._id)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(202)
                .expect(/applications/)
                .expect('Content-Type', /json/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });


        it('put one app on system - app way', function (done) {
            let data = Object.assign(applications[0], {'system': [_.pick(system[0], ['_id', 'name'])]});

            request(mock)
                .put('/applications/' + applications[0]._id)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(202)
                .expect(/system/)
                .expect('Content-Type', /json/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('put another app on system - system way', function (done) {
            let data = {'id': [_.get(applications[0], '_id')]};

            request(mock)
                .patch('/system/' + system[1]._id + '/applications')
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(202)
                .expect(/system/)
                .expect('Content-Type', /json/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('put one system on client - system way', function (done) {
            let data = Object.assign(system[0], {'clients': [_.pick(clients[0], ['_id', 'name'])]});

            request(mock)
                .put('/system/' + system[0]._id)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(202)
                .expect(/client/)
                .expect('Content-Type', /json/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('put another system on client - client way', function (done) {
            let data = {'id': [_.get(system[0], '_id')]};

            request(mock)
                .patch('/clients/' + clients[1]._id + '/system')
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(202)
                .expect(/client/)
                .expect('Content-Type', /json/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('add my servers on dcs', function () {
        it('add dc on servers', function (done) {
            let data = Object.assign(
                servers[0],
                {'datacenters': _.pick(datacenters[0], ['name', '_id'])}
            );

            request(mock)
                .put('/servers/' + servers[0]._id)
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(202)
                .expect(/datacenters/)
                .expect('Content-Type', /json/)
                .expect(/_id/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure if my setup is ok', function () {
        it('select my first servers', function (done) {

            request(mock)
                .get('/servers/' + servers[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.applications).to.deep.equal(
                        [
                            _.pick(applications[0], ['_id', 'name', 'family']),
                            _.pick(applications[1], ['_id', 'name', 'family'])
                        ]);
                    expect(res.body.applications).to.have.length(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('select my first app', function (done) {

            request(mock)
                .get('/applications/' + applications[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.system).to.deep.equal(
                        [
                            _.pick(system[0], ['_id', 'name']),
                            _.pick(system[1], ['_id', 'name'])
                        ]);
                    expect(res.body.system).to.have.length(2);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('select my first system', function (done) {

            request(mock)
                .get('/system/' + system[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.clients).to.deep.equal(
                        [
                            _.pick(clients[0], ['_id', 'name']),
                            _.pick(clients[1], ['_id', 'name'])
                        ]);
                    expect(res.body.clients).to.have.length(2);
                })
                .expect(/name/)
                .expect(/tags/)
                .expect(/description/)
                .expect(/clients/)
                .expect(/roles/)
                .expect(/owner/)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('delete my relations', function () {
        it('delete one system in the app - system way', function (done) {

            let data = {'id': [_.get(applications[0], '_id')]};

            request(mock)
                .delete('/system/' + system[0]._id + '/applications')
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('delete one client in the system - client way', function (done) {

            let data = {'id': [_.get(system[0], '_id')]};

            request(mock)
                .delete('/clients/' + clients[0]._id + '/system')
                .send(data)
                .set('Authorization', `JWT ${user.token}`)
                .expect(204)
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

    describe('ensure if my system has deleted', function () {
        it('read app system', function (done) {

            request(mock)
                .get('/applications/' + applications[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.system).to.deep.equal(
                        [
                            _.pick(system[1], ['_id', 'name'])
                        ]);
                    expect(res.body.system).to.have.length(1);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });

        it('read system client', function (done) {

            request(mock)
                .get('/system/' + system[0]._id)
                .set('Authorization', `JWT ${user.token}`)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.clients).to.deep.equal(
                        [
                            _.pick(clients[1], ['_id', 'name'])
                        ]);
                    expect(res.body.clients).to.have.length(1);
                })
                .end(function (err) {
                    if (err) return done(err);
                    done(err);
                });
        });
    });

});
