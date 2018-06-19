'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
            protocol: ['rest', 'graphQL', 'falcor', 'thrift', 'soap', 'xml-rpc', 'gRPC', 'gossip', 'beep', 'cts', 'wps', 'wscl', 'wsfl', 'wcf', 'xins']
        },
        "key": "deps_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'deps_options'}, [], {}, {remove: true}, next);
};
