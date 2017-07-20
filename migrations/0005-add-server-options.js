'use strict';

exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
            serverType: ['Virtual', 'Exalogic', 'Exadata', 'Physical', 'PSeries'],
            status: ['Active', 'Avaliable'],
            auths: ['PKI', 'AD', 'LDAP', 'Password'],
            env: ['Production', 'Staging', 'Development', 'UTA'],
            role: ['Application', 'Container', 'Database', 'Hybrid'],
            os: ['Linux', 'Windows', 'Solaris', 'FreeBSD', 'MacOS'],
            services: ["Apache HTTPD", "Nginx", "Docker", "Oracle Database", 'MySQL'],
            datacenter: []
        },
        "key": "server_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'server_options'}, [], {}, {remove: true}, next);
};
