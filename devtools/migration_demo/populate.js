'use strict';

// demo populate, connect on real env, carefull

require('dotenv').config({path: '.env.load'});
const uuidv4 = require('./data/uuidv4');

let chai = require('chai'),
    request = require('supertest'),
    cleaner_lines = require('../../test/e2e/libs/cleaner_lines'),
    _ = require('lodash');


describe('demo setup', function () {

    let app, mock;

    const HTTP_ENDPOINT = process.env.HTTP_ENDPOINT || "http://localhost:8888";

    const user = require('./data/user.js')[0];
    const datacenters = require('./data/datacenters.js');
    const clients = require('./data/clients.js');
    const teams = require('./data/teams.js');
    const system = require('./data/system.js');
    const applications = require('./data/apps.js');
    const snapshots = require('./data/snapshots.js');
    const images = require('./data/images.js');
    const network = require('./data/network.js');
    const deps = require('./data/deps.js');
    const rzones = require('./data/zones.js');

    const reports = require('./data/reports.js');
    const graphs = require('./data/analytics.js');

    const makeDC = require('./data/servers_blueprint_dc.js');

    const servers = require('./data/servers.js');
    const skipped = false;


    before(function (done) {

        cleaner_lines('users', {name: user.name})
            .then(() => {
                Promise.all([
                    cleaner_lines('datacenters', {'owner.email': user.email}),
                    cleaner_lines('clients', {'owner.email': user.email}),
                    cleaner_lines('teams', {'owner.email': user.email}),
                    cleaner_lines('systems', {'owner.email': user.email}),
                    cleaner_lines('applications', {'owner.email': user.email}),
                    cleaner_lines('servers', {'owner.email': user.email}),
                    cleaner_lines('volumes', {'owner.email': user.email}),
                    cleaner_lines('snapshots', {'owner.email': user.email}),
                    cleaner_lines('images', {'owner.email': user.email}),
                    cleaner_lines('networks', {'owner.email': user.email}),
                    cleaner_lines('graphs', {'owner.email': user.email}),
                    cleaner_lines('reports', {'owner.email': user.email})
                ]);
            })
            .then((e) => {
                app = require('../../test/e2e/libs/bootApp')();

                app.once('start', done);
                mock = app.listen(1341);
            }).catch(console.log);
    });

    after(function (done) {
        mock.close(done);
    });

    const createItem = function (col, value, done, callback) {
        request(mock)
            .post('/' + col)
            .set('Authorization', `JWT ${user.token}`)
            .send(value)
            .expect(console.log)
            .expect(201)
            .expect(callback)
            .end(function (err) {
                if (err) return done(err);
                done(err);
            });
    };

    const parseEntity = (index, lrel, inject = null) => {

        const pop = (rel) => {
            const s = rel.split('#')[1].split('::');
            const found = _.find(lrel, (o) => o[s[0]] == s[1]);

            if (!inject)
                inject = (ff) => _.pick(ff, ['_id', 'name', 'email', 'family']);

            return inject(found);
        };

        if (_.isArray(index))
            index = _.map(index, pop);

        if (_.isString(index))
            index = pop(index);

        return index;
    };

    const relData = function (value, field, lrel, inject = null) {
        let index = _.get(value, field);
        index = parseEntity(index, lrel, inject);

        _.set(value, field, index);
        return value;
    };

    const popDcs = (ff, srv = false) => {
        const regions = _.get(ff, 'regions');
        const provider = _.get(ff, 'provider');

        let obj = ff;

        if (regions) {
            const rg = regions[_.random(0, regions.length-1)];
            obj["region"] = rg;

            const zones1 = _.get(rzones, provider);
            const zones = _.get(zones1, rg);

            if (zones) {
                let zn = null;

                if(srv) {
                    zn = zones[_.random(0, zones.length-1)];
                } else {
                    zn = zones;
                }

                obj["zone"] = zn;
            }
        }

        return _.pick(obj, ['_id', 'name', 'email', 'region', 'zone', 'provider']);
    };

    const createStorage = (item) => {
        const tmst = [];

        _.forEach(item, (val, key) => {
            const l = uuidv4('xx');

            if (val == '#built') {
                const stg = {
                    "size": _.random(50, 1000),
                    "name": "/dev/xv"+l+key,
                    "mount": "/dev/xsd"+uuidv4('x'),
                    "status": "Active"
                }
                tmst.push(stg);
            }

            if (val == '#attach') {

                const stg = {
                    "name": "vol-"+uuidv4('xxxxxxxxxxxxxxxxx'),
                    "mount": "/dev/xv"+l,
                    "size": _.random(50, 1000),
                    "delete_termination": true,
                    "status": "Active",
                    "unique_id": "vol-"+uuidv4('xxxxxxxxxxxxxxxxx')
                }
                tmst.push(_.omit(stg, ["size", "delete_termination"]));

                createItem("volumes", stg, ()=>{}, (res) => {
                    //console.log(res);
                });
            }

        });

        return tmst;
    };


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


    describe('create Datacenters, Clients and Teams', function () {
        const data = {datacenters, clients, teams};

        _.forEach(data, (lst, entity) => {
            _.forEach(lst, (value, key) => {
                it(`Create ${entity} - ${value.name}`, function (done) {
                    createItem(entity, value, done, (res) => {
                        data[entity][key] = _.merge({}, _.get(res, 'body'), value);
                    });
                });
            });
        });
    });

    describe('create System', function () {
        if(skipped)
            return;

        const entity = "system";

        _.forEach(system, (value, key) => {
            it(`Create ${entity} - ${value.name}`, function (done) {

                value = relData(value, 'clients', clients);

                createItem(entity, value, done, (res) => {
                    system[key] = _.merge({}, _.get(res, 'body'), value);
                });
            });
        });
    });

    describe('create Images, Snapshots and Networks', function () {
        if(skipped)
            return;
        const data = {snapshots, images, network};

        _.forEach(data, (lst, entity) => {
            _.forEach(lst, (value, key) => {
                it(`Create ${entity} - ${value.name}`, function (done) {

                    if (_.has(value, 'datacenters'))
                        relData(value, 'datacenters', datacenters, popDcs);

                    createItem(entity, value, done, (res) => {
                        data[entity][key] = _.merge({}, _.get(res, 'body'), value);
                    });
                });
            });
        });
    });

    describe('create Applications', function () {
        const entity = "applications";

        _.forEach(applications, (value, key) => {
            it(`Create ${entity} - ${value.name}`, function (done) {

                relData(value, 'system', system);

                if (_.has(value, 'datacenters'))
                    relData(value, 'datacenters', datacenters, popDcs);

                createItem(entity, value, done, (res) => {
                    applications[key] = _.merge({}, _.get(res, 'body'), value);
                });
            });
        });
    });

    describe('sync deps', function () {
        const entity = "applications/deps";

        it(`Deps`, function (done) {

            let tree = {};

            _.forEach(deps, (val, key) => {
                if(key.indexOf("root") == -1) {

                    const idk = _.get(parseEntity(key, applications), '_id');

                    val.map((obj) => {

                        const nobj = parseEntity(
                            obj['name'],
                            applications,
                            (xx) => _.pick(xx, ['_id', 'name', 'family', 'environment'])
                            )

                        return _.merge(obj, nobj);
                    });

                    tree[idk] = val;
                }
            });

            createItem(entity, {tree}, done, () => {});
        });
    });


    describe('create Servers', function () {
        if(skipped)
            return;
        const entity = "servers";

        _.forEach(servers, (value) => {
            it(`Create ${entity} - ${value.hostname}`, function (done) {


                relData(value, 'applications', applications);
                value['storage'] = createStorage(_.get(value, 'storage', []));

                const dc = popDcs(datacenters[_.random(0, datacenters.length-1)], true)
                value['datacenters'] = _.assign({}, dc, makeDC(_.get(dc, 'provider')))

                createItem(entity, value, done, (res) => {
                    _.merge(value, _.get(res, 'body'));
                });
            });
        });
    });





    describe('activated hooks', function () {
        const entity = {reports, graphs};

        _.forEach(entity, (objt, key) => {

            _.forEach(objt, (value) => {
                it(`Create ${key} - ${value.name}`, function (done) {

                    relData(value, 'apps', applications);

                    request(HTTP_ENDPOINT)
                        .post("/" + key)
                        .set('Authorization', `JWT ${user.token}`)
                        .send(value)
                        .expect(console.log)
                        .expect(201)
                        .end(function (err) {
                            if (err) return done(err);
                            done(err);
                        });

                });
            });

        });


    });
});
