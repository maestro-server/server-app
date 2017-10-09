'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
            types: ['Relational', 'Document Store', 'Key Value', 'Graph', 'MultiModel', 'Object', 'XML DB', 'TimeSeries', 'Scientific', 'Outher'],
            role: ['Master', 'Replica', 'Arbiter', 'Clusterized'],
            cluster: ['Single Instance', 'Master/Replica', 'Sharding'],
            oracle: {
              asm_types: ['Standard'],
              storage_types: ['Default Disk', 'ASM', 'ACFS', 'Thirty Party'],
              role: ['Primary', 'Physical StandBy', 'Logical StandBy'],
              cluster: ['RAC', 'Grid System', 'Single Instance'],
              type: ['Application', 'Storage (ASM/ACFS)', 'Manange Oracle Service (SOA)']
            }
        },
        "key": "database_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'database_options'}, [], {}, {remove: true}, next);
};
