const mongodb = require('mongodb');

exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value" : [
            "linux",
            "windows",
            "solaris",
            "freebsd",
            "mac os"
        ],
        "key" : "server_os",
        "active" : true,
        "updated_at" : new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'server_os'}, [], {}, { remove: true }, next);
};
