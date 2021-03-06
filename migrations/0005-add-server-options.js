'use strict';

exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insertOne({
        'value': {
            serverType: ['Virtual', 'Exalogic', 'Exadata', 'Physical', 'PSeries'],
            status: ['Active', 'Avaliable', 'Stopped'],
            auth: ['PKI', 'AD', 'LDAP', 'Password', 'SAML'],
            role: ['Application', 'Cache', 'Container', 'Database', 'File', 'Loadbalance', 'Monitoring', 'NAT', 'Proxy', 'SMTP', 'VPN', 'Standard'],
            os: ['Linux', 'Windows', 'Solaris', 'FreeBSD', 'MacOS']
        },
        'key': 'server_options',
        'active': true,
        'updated_at': new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findOneAndDelete({key: 'server_options'}, next);
};
