'use strict';


exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        "value": {
            families: ['Application', 'Loadbalance', 'Broker', 'Database', 'Serverless', 'ApiGateway', 'ContainerOrchestration', 'Cache', 'CDN', 'Object Storage', 'Monitoring', 'Logs', 'SMTP', 'ServiceDiscovery', 'VPN', 'Repository', 'DNS', 'CX', 'Auth'],
            environment: ['Production', 'Staging', 'Development', 'UTA', 'Training', 'SandBox'],
            role: ['Application', 'Worker', 'Jobs', 'Testing', 'Standard'],
            deploy: ['Git (Github, Bibucket)', 'Continuos Integration (CI)', 'Continuos Deployment (CD)', 'FTP', 'SFTP'],
            clusters: ['No', 'Master/Slave', '12 Factor', 'ZooKeeper', 'Leader election'],
            languages: ['Java', 'NodeJS', 'Python', 'PHP', 'Ruby', '.NET', 'C/C++', 'C#', 'Erlang', 'Elixir', 'Go', 'Perl', 'Haskell', 'Delphi', 'R', 'Rusty', 'Clojure', 'Scala']
        },
        "key": "application_options",
        "active": true,
        "updated_at": new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'application_options'}, [], {}, {remove: true}, next);
};
