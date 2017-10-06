'use strict';

exports.up = function (db, next) {
    let pets = db.collection('adminer');
    pets.insert({
        'value': {
            serverType: ['Virtual', 'Exalogic', 'Exadata', 'Physical', 'PSeries'],
            status: ['Active', 'Avaliable'],
            auth: ['PKI', 'AD', 'LDAP', 'Password'],
            environment: ['Production', 'Staging', 'Development', 'UTA', 'Training', 'SandBox'],
            role: ['Application', 'Cache', 'Container', 'Database', 'File', 'Loadbalance', 'Monitoring', 'NAT', 'Proxy', 'SMTP', 'VPN', 'Standard'],
            os: ['Linux', 'Windows', 'Solaris', 'FreeBSD', 'MacOS'],
            services: ['Ansible', 'Apache CouchDB', 'Apache HTTPD', 'Apache Kafka', 'Apache Solr', 'Apache Storm', 'Apache Tomcat', 'Apache Zookeeper', 'Bind9', 'Cassandra', 'Chef', 'DC/OS', 'Docker', 'Docker Registry', 'Docker Swarm', 'Drools', 'Elixir', 'Elm', 'Erlang', 'ElasticSearch', 'Grafana', 'HaProxy', 'Haskell', 'Hashcorp Consul', 'Hashcorp Vault', 'Hashcorp Serf', 'Hashcorp Terraform', 'Hashcorp Packer', 'Hue', 'InfluxDB', 'Jboss', 'Jenkins', 'Kibana', 'LogStash', 'Memcache', 'Mesos', 'Microsoft Active Directory (AD)', 'Microsoft IIS', 'Microsoft Sharepoint', 'Microsoft SQL Server', 'Microsoft Windows Server Update Service (WSUS)', 'MongoDB', 'Oracle MySQL', 'Enterprise MySQL', 'MariaDB', 'Percona', 'Aurora (AWS)', 'OurDelta', 'Drizzle', 'Nagios', 'Nginx', 'NodeJS', 'OpenVPN', 'Oracle Database', 'Oracle NoSQL', 'Oracle Coherence', 'Oracle EBS (Service BUS)', 'Oracle Enterprise Manager', 'Oracle Forms and Reports', 'Oracle Forms Runtime', 'Oracle GlassFish', 'OpenJDK (Java)', 'Oracle JDK (Java)', 'Oracle WebLogic Server', 'PHP (PHP-FPM)', 'PostFix', 'Postgres', 'Prolog', 'Prometheus', 'Python', 'Puppet', 'Rabbimq', 'Rancher', 'Redis', 'Rusty', 'Salt', 'Samba', 'Serv-V', 'Squid', 'TensorFlow', 'Tsuro', 'VPC', 'Webquery', '.NET', 'OpenSwan', 'GrayLog'],
            datacenter: []
        },
        'key': 'server_options',
        'active': true,
        'updated_at': new Date()
    }, next);
};

exports.down = function (db, next) {
    let pets = db.collection('adminer');

    pets.findAndModify({key: 'server_options'}, [], {}, {remove: true}, next);
};
