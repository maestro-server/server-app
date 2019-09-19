'use strict';

let MongoClient = require("mongodb").MongoClient;
const dbpath = require('../../../app/core/libs/dbpath')();




module.exports = function (collections, filter, conn = dbpath) {
    return new Promise((resolve, reject) => {

        const strOpts = {
            useUnifiedTopology: true,
            useNewUrlParser: true
          };

        MongoClient.connect(conn, strOpts)
            .then((db) => {
                let pets = db.collection(collections);
                pets.remove(filter, () => {
                    db.close();
                    resolve();
                });
            }).catch(reject)
    });
};
