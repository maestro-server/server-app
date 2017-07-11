'use strict';

exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value" : [
            "application",
            "database",
            "container",
            "loadbalance",
            "worker"
        ],
        "key" : "server_role",
        "active" : true,
        "updated_at" : new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'server_role'}, [], {}, { remove: true }, next);
};
