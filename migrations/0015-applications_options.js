'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
            environment: ['Production', 'Staging', 'Development', 'UTA', 'Training', 'SandBox'],
            role: ['Application', 'Worker', 'LoadBalance', 'Jobs', 'Service Discovery', 'Monitoring', 'Testing', 'Standard'],
            deploy: ['Git (Github, Bibucket)', 'Continuos Integration (CI)', 'Continuos Deployment (CD)', 'FTP', 'SFTP']
        },
        "key": "app_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'app_options'}, [], {}, {remove: true}, next);
};
