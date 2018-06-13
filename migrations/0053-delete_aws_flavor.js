'use strict';

exports.up = function (db, next) {
    let pets = db.collection('flavors');

    pets.deleteMany({provider: 'AWS'}, next);
};

exports.down = function (db, next) {
    let pets = db.collection('flavors');

    pets.deleteMany({provider: 'AWS'}, next);
};
