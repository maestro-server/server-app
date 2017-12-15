'use strict';

exports.up = function (db, next) {
    let pets = db.collection('events');

    pets.createIndex( {"created_at": 1 }, { expireAfterSeconds: 15*24*60*60 }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('events');

    pets.dropIndex('created_at_1', next);
};
