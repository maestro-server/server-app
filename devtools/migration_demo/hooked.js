'use strict';

// demo populate, connect on real env, carefull

require('dotenv').config({path: '.env'});
let _ = require('lodash');


describe('hooked setup', function () {

    const HTTP_ENDPOINT = "http://localhost:8888";

    const path = (end) => `${HTTP_ENDPOINT}/${end}`;
    const reports = require('./data/reports.js');
    const analytics = require('./data/analytics.js');

    describe('create Servers', function () {
        const entity = {reports, analytics};

        _.forEach(entity, (objt, key) => {

            _.forEach(objt, (value) => {
                it(`Create ${key} - ${value.name}`, function (done) {

                    request(mock)
                        .post(path(key))
                        .set('Authorization', `JWT ${user.token}`)
                        .send(value)
                        .expect(console.log)
                        .expect(201)
                        .expect(callback)
                        .end(function (err) {
                            if (err) return done(err);
                            done(err);
                        });

                });
            });

        });


    });

});
