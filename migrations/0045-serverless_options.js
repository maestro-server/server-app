'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
            environment: ['Production', 'Staging', 'Development', 'UTA', 'Training', 'SandBox'],
            third: ['AWS Lambda', 'Google Cloud Functions', 'Azure Functions ', 'IBM OpenWhisk', 'iron.io ', 'Peer5', 'StdLib', 'Auth0 Webtasks', 'Surge', 'Brightwork', 'Kloudbit', 'Stackery'],
            own: ['Fission', 'Kubeless', 'Effe']
        },
        "key": "serverless_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'serverless_options'}, [], {}, {remove: true}, next);
};
