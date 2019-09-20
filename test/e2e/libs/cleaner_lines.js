'use strict';

let MongoClient = require("mongodb").MongoClient;
const dbpath = require('../../../app/core/libs/dbpath')();
const dbname = require('../../../app/core/libs/dbname')();

module.exports = function (collections, filter, conn = dbpath) {
    return new Promise((resolve, reject) => {

        const strOpts = {
            useUnifiedTopology: true,
            useNewUrlParser: true
          };

        MongoClient.connect(conn, strOpts)
            .then((client) => {
                const db = client.db(dbname);
                let pets = db.collection(collections);
                pets.deleteMany(filter, () => {
                    client.close();
                    resolve();
                });
            }).catch(reject)
    });
};
