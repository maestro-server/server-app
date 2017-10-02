'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
            environment: ['Production', 'Staging', 'Development', 'UTA', 'Training', 'SandBox'],
            types: ['Relational', 'Document Store', 'Key Value', 'Graph', 'MultiModel', 'Object', 'XML DB', 'TimeSeries', 'Scientific', 'Outher'],
            role: ['Master', 'Replica', 'Arbiter', 'Clusterized'],
            cluster: ['Single Instance', 'Master/Replica', 'Sharding'],
            mysql: {
              third: ['RDS (AWS)', 'Relational (Azure)', 'Relacional (GoogleCloud)'],
              own: ['MySQL', 'Enterprise MySQL', 'MariaDB', 'Percona', 'Aurora (AWS)', 'OurDelta', 'Drizzle']
            },
            oracle: {
              third: ['RDS (AWS)', 'Relational (Azure)', 'Relacional (GoogleCloud)'],
              own: ['Oracle DB', 'Oracle NoSQL', 'Oracle Coherence'],
              asm_types: ['Standard'],
              storage_types: ['Default Disk', 'ASM', 'ACFS', 'Thirty Party'],
              role: ['Primary', 'Physical StandBy', 'Logical StandBy'],
              containers: ['No CDB', 'CDB'],
              cluster: ['RAC', 'Grid System', 'Single Instance'],
              type: ['Application', 'Manange Oracle Service (ASM, SOA)']
            },
            third: ['RDS (AWS)', 'DynamoDB (AWS)', 'Relational (Azure)', 'DocumentDB (Azure)', 'BigQuey (Google)', 'Caspio', 'IBM Cloudant', 'Zoho Creator'],
            own: ['PostGres', 'FireBird', 'MSSql', 'NexusDB', 'Redis', 'ElasticSearch', 'Apache Solr', 'MongoDB', 'CouchDB', 'DatomicDB', 'Neo4J', 'Cassandra', 'HBase', 'CloudData', 'Druid', 'ArangoDB', 'OrientDB', 'gunDB', 'RethinkDB', 'Riak', 'LevelDB', 'Voldermort', 'AlchemistDB', 'VelocidtyDB', 'InterBase', 'InfluxDB', 'PromSQL', 'OpenTSDB', 'IBM DB2']
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
