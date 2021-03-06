'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insertOne({
        "value": {
            families: ['Application', 'Loadbalance', 'Broker', 'Database', 'Serverless', 'ApiGateway', 'ContainerOrchestration', 'ServiceMesh', 'Cache', 'CDN', 'ObjectStorage', 'Monitor', 'Logs', 'SMTP', 'ServiceDiscovery', 'VPN', 'Repository', 'DNS', 'CI/CD', 'Auth', 'NAS', 'AutoScaling', 'AutoScalingPlan', 'Corporate'],
            role: ['Application', 'Worker', 'Jobs', 'Testing', 'Standard'],
            deploy: ['Git (Github, Bibucket)', 'Continuos Integration (CI)', 'Continuos Deployment (CD)', 'FTP', 'SFTP', 'Others'],
            clusters: ['No', 'Master/Slave', 'Master/Master', '12 Factor', 'ZooKeeper', 'Leader election']
        },
        "key": "application_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findOneAndDelete({key: 'application_options'}, next);
};
