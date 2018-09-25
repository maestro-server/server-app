'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
          environment: ['Production', 'Staging', 'Development', 'UTA', 'Training', 'SandBox'],
          size: ['nano', 'small', 'medium', 'large', 'xlarge', '2xlarge', '4xlarge', '8xlarge', '16xlarge', '32xlarge']
        },
        "key": "env_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'env_options'}, [], {}, {remove: true}, next);
};
