"use strict";

let MongoClient = require("mongodb").MongoClient;

module.exports = function (collection, done, mock) {


    MongoClient.connect('mongodb://'+process.env.MONGO_URL, (err, db) => {

        db.collection(collection, {}, (err1, coll) => {

            coll.remove({}, (err2, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(result);
                db.close();
                mock.close(done);
            });

        });
    });

};
