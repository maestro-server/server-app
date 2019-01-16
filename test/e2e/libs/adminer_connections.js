"use strict";

const _ = require('lodash');
let MongoClient = require("mongodb").MongoClient;
const dbpath = require('../../../app/core/libs/dbpath')();

module.exports = function (done, conn = dbpath) {
    MongoClient.connect(conn)
        .then((db) => {
            let pets = db.collection('adminer');

            const data = [
                {
                    "value": {
                        period: ['seconds', 'minutes', 'hours', 'days', 'weeks'],
                        period_type: ['interval', 'cron'],
                        method: ['GET', 'POST', 'PUT', 'DELETE'],
                        modules: ['webhook', 'connections', 'reports'],
                        configs: [
                            {
                                name: 'connections',
                                description: 'Polling provider',
                                source: 'discovery',
                                url: "crawler/<provider>/<_id>/<task>",
                                method: 'PUT',
                                options: {
                                    'server-list': {
                                        every: 5,
                                        period: 'minutes'
                                    }
                                }
                            }
                        ]
                    },
                    "key": "scheduler_options",
                    "active": true,
                    "updated_at": new Date()
                }
            ];

            pets.insertMany(data, done);
        });
};
