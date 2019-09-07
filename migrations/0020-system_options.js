'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insertOne({
        "value": {
            check: ['Public URL', 'Private URL', 'Admin', 'WebSocket', 'TCP/IP', 'Unix Sock', 'HealthCheck']
        },
        "key": "system_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findOneAndDelete({key: 'system_options'}, next);
};
