'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
            environment: ['Production', 'Staging', 'Development', 'UTA', 'Training', 'SandBox'],
            third: ['S3 (AWS)', 'Rackspace Files', 'Azure Storage', 'Digital Ocean Storage', 'Google Cloud Storage'],
            own: ['OpenStack Swift', 'Ceph', 'GlusterFS', 'Cloudian', 'IBM Spectrum Scale', 'Scality']
        },
        "key": "objectstorage_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'objectstorage_options'}, [], {}, {remove: true}, next);
};
