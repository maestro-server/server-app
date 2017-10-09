'use strict';

const _ = require('lodash');

exports.up = function (db, next) {
    let pets = db.collection('services');

    const attach = {
      "active": true,
      "updated_at": new Date()
    };

    const list = [
      {name: 'Ansible', tags: ['aaaaaaaa'], owner: false},
      {name: 'Apache CouchDB', family: ['Database'], tags: ['nosql'], owner: false},
      {name: 'Apache HTTPD', tags: ['webservice', 'proxy'], owner: false},
      {name: 'Apache Kafka', family: ['Broker'], tags: ['streams', 'message'], owner: false},
      {name: 'Apache Solr', family: ['Database'], tags: ['search'], owner: false},
      {name: 'Apache Storm', tags: ['events', 'realtime'], owner: false},
      {name: 'Apache Tomcat', tags: ['webservice', 'java'], owner: false},
      {name: 'Apache Zookeeper', family: ['ContainerOrchestration', 'ServiceDiscovery'], owner: false},
      {name: 'Bind9', family: ['DNS'], owner: false},
      {name: 'Cassandra', family: ['Database'], tags: ['nosql', 'key-value'], owner: false},
      {name: 'Chef', tags: ['config-manager'], owner: false},
      {name: 'DC/OS', family: ['ContainerOrchestration'], tags: ['docker', 'container'], owner: false},
      {name: 'Docker', tags: ['container'], owner: false},
      {name: 'Docker Registry', family: ['Repository'], tags: ['docker', 'registry'], owner: false},
      {name: 'Docker Swarm', family: ['ContainerOrchestration'], tags: ['docker'], owner: false},
      {name: 'Drools', owner: false},
      {name: 'Elixir', family: ['Application'], tags: ['language'], owner: false},
      {name: 'Elm', family: ['Application'], tags: ['language'], owner: false},
      {name: 'Erlang', family: ['Application'], tags: ['language'], owner: false},
      {name: 'ElasticSearch', family: ['Database'], tags: ['search', 'document', 'nosql'], owner: false},
      {name: 'Grafana', tags: ['dashboard'], owner: false},
      {name: 'HaProxy', family: ['LoadBalance'], tags: ['proxy'], owner: false},
      {name: 'Haskell', family: ['Application'], tags: ['aaaaaaaa'], owner: false},
      {name: 'Hashcorp Consul', family: ['ServiceDiscovery'], tags: ['election', 'key-value', 'gossip'], owner: false},
      {name: 'Hashcorp Vault', family: ['Database'], tags: ['crypt', 'key-value'], owner: false},
      {name: 'Hashcorp Serf', family: ['ServiceDiscovery'], tags: ['gossip'], owner: false},
      {name: 'Hashcorp Terraform', tags: ['config-manager'], owner: false},
      {name: 'Hashcorp Packer', tags: ['config-manageer', 'image'], owner: false},
      {name: 'InfluxDB', family: ['Database'], tags: ['nosql', 'timeseries'], owner: false},
      {name: 'JBoss', tags: ['webservice', 'jvm'], owner: false},
      {name: 'Jenkins', family: ['CX'], tags: ['cd', 'ci'], owner: false},
      {name: 'Kibana', tags: ['dashboard'], owner: false},
      {name: 'LogStash', tags: ['collector'], owner: false},
      {name: 'Memcache', family: ['Cache'], tags: ['nosql', 'key-value'], owner: false},
      {name: 'Mesos', family: ['ContainerOrchestration'], tags: ['docker', 'container', 'config-manager'], owner: false},
      {name: 'Microsoft Active Directory (AD)', family: ['Auth'], tags: ['microsoft'], owner: false},
      {name: 'Microsoft IIS', tags: ['microsoft', 'webservice'], owner: false},
      {name: 'Microsoft Sharepoint', tags: ['microsoft'], owner: false},
      {name: 'Microsoft SQL Server', family: ['Database'], tags: ['microsoft', 'relational'], owner: false},
      {name: 'Microsoft Windows Server Update Service (WSUS)', tags: ['microsoft'], owner: false},
      {name: 'MongoDB', family: ['Database'], tags: ['nosql', 'document'], owner: false},
      {name: 'Oracle MySQL', family: ['MySql'], tags: ['oracle', 'relational'], owner: false},
      {name: 'Enterprise MySQL', family: ['MySql'], tags: ['oracle', 'relational'], owner: false},
      {name: 'MariaDB', family: ['MySql'], tags: ['relational'], owner: false},
      {name: 'Percona', family: ['MySql'], tags: ['relational'], owner: false},
      {name: 'Aurora (AWS)', family: ['MySql'], tags: ['relational', 'aws'], owner: true},
      {name: 'OurDelta', family: ['aaaaaaaaaa'], tags: ['aaaaaaaa'], owner: false},
      {name: 'Drizzle', family: ['aaaaaaaaaa'], tags: ['aaaaaaaa'], owner: false},
      {name: 'Nagios', family: ['Monitoring'], tags: ['aaaaaaaa'], owner: false},
      {name: 'Nginx', family: ['aaaaaaaaaa'], tags: ['aaaaaaaa'], owner: false},
      {name: 'NodeJS', family: ['Application'], tags: ['aaaaaaaa'], owner: false},
      {name: 'OpenVPN', family: ['aaaaaaaaaa'], tags: ['aaaaaaaa'], owner: false},
      {name: 'Oracle Database', family: ['Oracle'], tags: ['oracle', 'relational'], owner: false},
      {name: 'Oracle NoSQL', family: ['Oracle'], tags: ['oracle'], owner: false},
      {name: 'Oracle Coherence', family: ['Oracle'], tags: ['oracle'], owner: false},
      {name: 'Oracle EBS (Service BUS)', family: ['aaaaaaaaaa'], tags: ['oracle'], owner: false},
      {name: 'Oracle Enterprise Manager', family: ['aaaaaaaaaa'], tags: ['oracle'], owner: false},
      {name: 'Oracle Forms and Reports', family: ['aaaaaaaaaa'], tags: ['oracle'], owner: false},
      {name: 'Oracle Forms Runtime', family: ['aaaaaaaaaa'], tags: ['oracle'], owner: false},
      {name: 'Oracle GlassFish', family: ['aaaaaaaaaa'], tags: ['oracle'], owner: false},
      {name: 'OpenJDK (Java)', family: ['aaaaaaaaaa'], tags: ['aaaaaaaa'], owner: false},
      {name: 'Oracle JDK (Java)', family: ['aaaaaaaaaa'], tags: ['oracle'], owner: false},
      {name: 'Oracle WebLogic Server', family: ['aaaaaaaaaa'], tags: ['oracle'], owner: false},
      {name: 'PHP (PHP-FPM)', family: ['aaaaaaaaaa'], tags: ['aaaaaaaa'], owner: false},
      {name: 'PostFix', family: ['aaaaaaaaaa'], tags: ['aaaaaaaa'], owner: false},
      {name: 'Postgres', family: ['Database'], tags: ['aaaaaaaa'], owner: false},
      {name: 'Prolog', family: ['aaaaaaaaaa'], tags: ['aaaaaaaa'], owner: false},
      {name: 'Prometheus', family: ['Monitoring'], tags: ['aaaaaaaa'], owner: false},
      {name: 'Python', family: ['Application'], tags: ['aaaaaaaa'], owner: false},
      {name: 'Puppet', family: ['aaaaaaaaaa'], tags: ['aaaaaaaa'], owner: false},
      {name: 'Rabbimq', family: ['aaaaaaaaaa'], tags: ['aaaaaaaa'], owner: false},
      {name: 'Rancher', family: ['aaaaaaaaaa'], tags: ['aaaaaaaa'], owner: false},
      {name: 'Redis', family: ['Database', 'Cache'], tags: ['aaaaaaaa'], owner: false},
      {name: 'Rusty', family: ['Application'], tags: ['aaaaaaaa'], owner: false},
      {name: 'Salt', family: ['aaaaaaaaaa'], tags: ['aaaaaaaa'], owner: false},
      {name: 'Samba', family: ['aaaaaaaaaa'], tags: ['aaaaaaaa'], owner: false},
      {name: 'Serv-V', family: ['aaaaaaaaaa'], tags: ['aaaaaaaa'], owner: false},
      {name: 'Squid', family: ['aaaaaaaaaa'], tags: ['aaaaaaaa'], owner: false},
      {name: 'TensorFlow', family: ['aaaaaaaaaa'], tags: ['aaaaaaaa'], owner: false},
      {name: 'Tsuro', family: ['aaaaaaaaaa'], tags: ['aaaaaaaa'], owner: false},
      {name: 'VPC', family: ['aaaaaaaaaa'], tags: ['aaaaaaaa'], owner: false},
      {name: 'Webquery', family: ['aaaaaaaaaa'], tags: ['aaaaaaaa'], owner: false},
      {name: 'Microsoft .NET', family: ['aaaaaaaaaa'], tags: ['aaaaaaaa'], owner: false},
      {name: 'OpenSwan', family: ['aaaaaaaaaa'], tags: ['aaaaaaaa'], owner: false}
    ];

    let result = list.map(e => Object.assign(e, attach));
    result = _.sortBy(list, ['name', '[family']);

    pets.insertMany(result, {ordered: true}, next);
};

exports.down = function (db, next) {
    db.collection('services').remove(next);
};
