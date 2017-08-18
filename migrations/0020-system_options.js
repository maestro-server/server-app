'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
            check: ['Public URL', 'Private URL', 'Admin', 'WebSocket', 'TCP/IP', 'Unix Sock', 'HealthCheck'],
            apps: ['Application', 'LoadBalance', 'Broker', 'DataBase', 'Serveless', 'Api Gateway', 'SearchEngine', 'Cache']
        },
        "key": "system_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'system_options'}, [], {}, {remove: true}, next);
};