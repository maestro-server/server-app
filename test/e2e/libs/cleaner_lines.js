'use strict';

let MongoClient = require("mongodb").MongoClient;
const dbpath = require('../../../app/core/libs/dbpath')();




module.exports = function (collections, filter, conn = dbpath) {
    return new Promise((resolve, reject) => {

        MongoClient.connect(conn)
            .then((db) => {
                let pets = db.collection(collections);
                pets.remove(filter, () => {
                    db.close();
                    resolve();
                });
            }).catch(reject)
    });
};
