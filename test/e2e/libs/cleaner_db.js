"use strict";

const DatabaseCleaner = require('database-cleaner');
const databaseCleaner = new DatabaseCleaner('mongodb');
const connect = require('mongodb').connect;

module.exports = function (done, mock) {

    connect('mongodb://'+process.env.MONGO_URL, function(err, db) {
        databaseCleaner.clean(db, function() {
            console.log("clear db");
            db.close();
            mock.close(done);
        });
    });

};
