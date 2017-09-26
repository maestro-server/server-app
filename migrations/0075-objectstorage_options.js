'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
            environment: ['Production', 'Staging', 'Development', 'UTA', 'Training', 'SandBox'],
            third: ['ELB (AWS)', 'LB (Digital Ocean)', 'LB (Google Cloud)', 'LB (Azure)', 'NetScaler'],
            own: ['Haproxy', 'Nginx', 'Httpd', 'F5 Bigip', 'Rancher (Cattle)', 'Kubernetes', 'Docker Swarm', 'PFSense']
        },
        "key": "logs_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'logs_options'}, [], {}, {remove: true}, next);
};
