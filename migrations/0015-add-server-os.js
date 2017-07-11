'use strict';

exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "entities": ["Linux", "Windows", "Solaris", "FreeBSD", "MacOS"],
        "value" : {
          "Linux": {
                dist: ['Centos', 'Ubuntu', 'Debian', 'AMI', 'Fedora', 'Suse', 'Oracle Linux', 'Linux Mint', 'CoreOS', 'RancherOS']
            },
            "Windows": {
              dist: ["Personal", "Server"]
            },
            "Solaris": {
              dist: null
            },
            "FreeBSD": {
              dist: null
            },
            "MacOS": {
              dist: ["Personal", "Server"]
            }},
        "key" : "server_os",
        "active" : true,
        "updated_at" : new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'server_os'}, [], {}, { remove: true }, next);
};
