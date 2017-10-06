'use strict';

const _ = require('lodash');

exports.up = function (db, next) {
    let pets = db.collection('services');

    const attach = {
      "active": true,
      "updated_at": new Date()
    };

    const list = [
      {name: 'Ansible', class: 'config manager', owner: false},
      {name: 'Apache CouchDB', family: 'Database', class: 'nosql', owner: false},
      {name: 'Apache HTTPD', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Apache Kafka', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Apache Solr', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Apache Storm', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Apache Tomcat', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Apache Zookeeper', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Bind9', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Cassandra', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Chef', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'DC/OS', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Docker', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Docker Registry', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Docker Swarm', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Drools', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Elixir', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Elm', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Erlang', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'ElasticSearch', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Grafana', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'HaProxy', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Haskell', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Hashcorp Consul', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Hashcorp Vault', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Hashcorp Serf', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Hashcorp Terraform', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Hashcorp Packer', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Hue', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'InfluxDB', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'JBoss', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Jenkins', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Kibana', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'LogStash', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Memcache', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Mesos', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Microsoft Active Directory (AD)', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Microsoft IIS', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Microsoft Sharepoint', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Microsoft SQL Server', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Microsoft Windows Server Update Service (WSUS)', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'MongoDB', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Oracle MySQL', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Enterprise MySQL', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'MariaDB', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Percona', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Aurora (AWS)', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'OurDelta', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Drizzle', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Nagios', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Nginx', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'NodeJS', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'OpenVPN', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Oracle Database', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Oracle NoSQL', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Oracle Coherence', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Oracle EBS (Service BUS)', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Oracle Enterprise Manager', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Oracle Forms and Reports', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Oracle Forms Runtime', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Oracle GlassFish', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'OpenJDK (Java)', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Oracle JDK (Java)', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Oracle WebLogic Server', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'PHP (PHP-FPM)', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'PostFix', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Postgres', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Prolog', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Prometheus', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Python', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Puppet', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Rabbimq', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Rancher', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Redis', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Rusty', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Salt', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Samba', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Serv-V', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Squid', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'TensorFlow', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Tsuro', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'VPC', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Webquery', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'Microsoft .NET', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false},
      {name: 'OpenSwan', family: 'aaaaaaaaaa', class: 'aaaaaaaa', owner: false}
    ];

    let result = list.map(e => Object.assign(e, attach));
    result = _.sortBy(list, ['name', 'family']);

    pets.insertMany(result, {ordered: true}, next);
};

exports.down = function (db, next) {
    db.collection('services').remove(next);
};
