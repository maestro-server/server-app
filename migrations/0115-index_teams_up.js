'use strict';

const coll = "teams"
const name = `${coll}_active_role`

exports.up = function (db, next) {
    let pets = db.collection(coll);
    pets.createIndex({
        'active': 1,
        "members._id": 1,
        "members.role": 1
    }, {name}, next);
};

exports.down = function (db, next) {
    let pets = db.collection(coll);

    pets.dropIndex(name, next);
};
