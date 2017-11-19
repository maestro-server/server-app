'use strict';

const _ = require('lodash');

exports.up = function (db, next) {
    let pets = db.collection('services');

    const attach = {
      "active": true,
      "updated_at": new Date()
    };

    const list = [
      {name: 'ELB (AWS)', family: ['Loadbalance'], tags: ['aws'], owner: true},
      {name: 'OpenStack (HaProxy)', family: ['Loadbalance'], tags: ['openstack'], owner: true},
      {name: 'LB (Digital Ocean)', family: ['Loadbalance'], tags: ['do'], owner: true},
      {name: 'LB (Google Cloud)', family: ['Loadbalance'], tags: ['gcloud'], owner: true},
      {name: 'LB (Azure)', family: ['Loadbalance'], tags: ['azure'], owner: true},
      {name: 'NetScaler', family: ['Loadbalance'], tags: [], owner: true},

      {name: 'Haproxy', family: ['Loadbalance'], tags: ['oss'], owner: false},
      {name: 'Nginx', family: ['Loadbalance', 'ApiGateway'], tags: ['oss'], owner: false},
      {name: 'Httpd', family: ['Loadbalance', 'ApiGateway'], tags: ['oss'], owner: false},
      {name: 'F5 Bigip', family: ['Loadbalance'], tags: ['f5'], owner: false},
      {name: 'Rancher', family: ['Loadbalance', 'ContainerOrchestration'], tags: ['oss', 'container'], owner: false},
      {name: 'Kubernetes', family: ['Loadbalance', 'ContainerOrchestration'], tags: ['oss', 'container'], owner: false},
      {name: 'Docker Swarm', family: ['Loadbalance', 'ContainerOrchestration'], tags: ['oss', 'docker'], owner: false},


      {name: 'AWS Elastic Cache', family: ['Cache'], tags: ['aws'], owner: true},
      {name: 'Azure', family: ['Cache'], tags: ['azure'], owner: true},
      {name: 'Google Cloud', family: ['Cache'], tags: ['gcloud'], owner: true},
      {name: 'Akamai', family: ['Cache', 'ApiGateway', 'CDN'], tags: [], owner: true},
      {name: 'CloudFlare', family: ['Cache', 'ApiGateway', 'CDN'], tags: ['waf'], owner: true},
      {name: 'GridGain Systems', family: ['Cache'], tags: [], owner: true},

      {name: 'Redis', family: ['Cache', 'Database'], tags: ['key-value', 'nosql'], owner: false},
      {name: 'Memcache', family: ['Cache'], tags: ['key-value'], owner: false},
      {name: 'Varnish', family: ['Cache'], tags: ['proxy'], owner: false},
      {name: 'Oracle Coherence', family: ['Cache'], tags: ['oracle'], owner: false},
      {name: 'Apache Ignite', family: ['Cache'], tags: ['oss'], owner: false},



      {name: 'SQS (AWS)', family: ['Broker'], tags: ['aws'], owner: true},
      {name: 'IronMQ', family: ['Broker'], tags: ['amqp'], owner: true},
      {name: 'Azure Service Bus', family: ['Broker'], tags: ['azure'], owner: true},
      {name: 'Google Cloud Pub/Sub', family: ['Broker'], tags: ['gcloud'], owner: true},
      {name: 'Pusher', family: ['Broker'], tags: ['amqp'], owner: true},
      {name: 'Enduro/X', family: ['Broker'], tags: [], owner: true},
      {name: 'Solace System', family: ['Broker'], tags: [], owner: true},

      {name: 'RabbitMq', family: ['Broker'], tags: ['amqp', 'oss'], owner: false},
      {name: 'Kafka', family: ['Broker'], tags: ['oss'], owner: false},
      {name: 'ZeroMq', family: ['Broker'], tags: ['oss'], owner: false},
      {name: 'Beanstalkd', family: ['Broker'], tags: ['oss'], owner: false},
      {name: 'ActiveMQ', family: ['Broker'], tags: ['oss'], owner: false},
      {name: 'Qpid', family: ['Broker'], tags: [], owner: false},
      {name: 'Gearman', family: ['Broker'], tags: ['oss'], owner: false},
      {name: 'HornetQ', family: ['Broker'], tags: [], owner: false},
      {name: 'Oracle WebLogic JMS', family: ['Broker'], tags: ['oracle'], owner: false},
      {name: 'IBM Websphere MQ', family: ['Broker'], tags: ['ibm'], owner: false},
      {name: 'Tarantool', family: ['Broker'], tags: [], owner: false},



      {name: 'AWS Lambda', family: ['Serverless'], tags: ['aws'], owner: true},
      {name: 'Google Cloud Functions', family: ['Serverless'], tags: ['gcloud'], owner: true},
      {name: 'Azure Functions', family: ['Serverless'], tags: ['azure'], owner: true},
      {name: 'IBM OpenWhisk', family: ['Serverless'], tags: ['ibm'], owner: true},
      {name: 'iron.io', family: ['Serverless'], tags: [], owner: true},
      {name: 'Peer5', family: ['Serverless'], tags: [], owner: true},
      {name: 'StdLib', family: ['Serverless'], tags: [], owner: true},
      {name: 'Auth0 Webtasks', family: ['Serverless'], tags: [], owner: true},
      {name: 'Surge', family: ['Serverless'], tags: [], owner: true},
      {name: 'Brightwork', family: ['Serverless'], tags: [], owner: true},
      {name: 'Kloudbit', family: ['Serverless'], tags: [], owner: true},
      {name: 'Stackery', family: ['Serverless'], tags: [], owner: true},

      {name: 'Fission', family: ['Serverless'], tags: [], owner: false},
      {name: 'Kubeless', family: ['Serverless'], tags: ['oss'], owner: false},
      {name: 'Effe', family: ['Serverless'], tags: [], owner: false},



      {name: 'ApiGateway (AWS)', family: ['ApiGateway'], tags: ['aws'], owner: true},
      {name: 'TyK', family: ['ApiGateway'], tags: [], owner: true},
      {name: 'IBM ApiGateway', family: ['ApiGateway'], tags: ['ibm'], owner: true},
      {name: 'StrongLoop API', family: ['ApiGateway'], tags: [], owner: true},

      {name: 'Kong', family: ['ApiGateway'], tags: ['oss', 'oauth'], owner: false},
      {name: 'WSO2 API', family: ['ApiGateway'], tags: [], owner: false},
      {name: 'Java Spring Cloud', family: ['ApiGateway'], tags: ['jvm', 'oss'], owner: false},
      {name: 'Netflix (Hystrix/Zuul)', family: ['ApiGateway'], tags: ['jvm', 'oss'], owner: false},


      {name: 'CloundFront (AWS)', family: ['CDN'], tags: ['aws'], owner: true},
      {name: 'Azure CDN', family: ['CDN'], tags: ['azure'], owner: true},
      {name: 'MaxCDN', family: ['CDN'], tags: [], owner: true},
      {name: 'Aryaka', family: ['CDN'], tags: [], owner: true},
      {name: 'Beluga CDN', family: ['CDN'], tags: [], owner: true},
      {name: 'CacheFly', family: ['CDN'], tags: [], owner: true},
      {name: 'CDN.net', family: ['CDN'], tags: [], owner: true},
      {name: 'CDNetwortks', family: ['CDN'], tags: [], owner: true},
      {name: 'HP Cloud Services', family: ['CDN'], tags: [], owner: true},
      {name: 'Incapsula', family: ['CDN'], tags: [], owner: true},
      {name: 'OVH', family: ['CDN'], tags: [], owner: true},
      {name: 'Rackspace Cloud files', family: ['CDN', 'ObjectStorage'], tags: ['rackspace'], owner: true},



      {name: 'Stackto',  family: ['ContainerOrchestration'], tags: ['container'], owner: true},
      {name: 'TuTum',  family: ['ContainerOrchestration'], tags: ['container'], owner: true},
      {name: 'ECS (AWS)',  family: ['ContainerOrchestration', 'Repository'], tags: ['aws', 'container'], owner: true},
      {name: 'Google Cloud (K8S)',  family: ['ContainerOrchestration', 'Repository'], tags: ['gcloud', 'container'], owner: true},
      {name: 'Azure Container Service',  family: ['ContainerOrchestration', 'Repository'], tags: ['azure', 'container'], owner: true},

      {name: 'OpenShift Origin',  family: ['ContainerOrchestration'], tags: ['container'], owner: false},
      {name: 'DC/OS',  family: ['ContainerOrchestration', 'Repository'], tags: ['container'], owner: false},
      {name: 'Marathon',  family: ['ContainerOrchestration'], tags: ['container'], owner: false},
      {name: 'Portainer',  family: ['ContainerOrchestration'], tags: ['container'], owner: false},
      {name: 'Panamax',  family: ['ContainerOrchestration'], tags: ['container'], owner: false},
      {name: 'Tsuro', family: ['ContainerOrchestration'], tags: ['container'], owner: false},



      {name: 'CloudWatch (AWS)',  family: ['Monitor'], tags: ['aws'], owner: true},
      {name: 'Azure Monitoring',  family: ['Monitor'], tags: ['azure'], owner: true},
      {name: 'Google Cloud Monitoring',  family: ['Monitor'], tags: ['gcloud'], owner: true},
      {name: 'Digital Ocean Monitoring',  family: ['Monitor'], tags: ['do'], owner: true},
      {name: 'NewRelic',  family: ['Monitor', 'Logs'], tags: ['apm'], owner: true},
      {name: 'DataDog',  family: ['Monitor', 'Logs'], tags: [], owner: true},
      {name: 'site24x7',  family: ['Monitor', 'Logs'], tags: ['apm'], owner: true},
      {name: 'Dynatrace APM',  family: ['Monitor'], tags: ['apm'], owner: true},
      {name: 'RollBar',  family: ['Monitor', 'Logs'], tags: [], owner: true},
      {name: 'Pingdom Server',  family: ['Monitor'], tags: [], owner: true},
      {name: 'Traceview',  family: ['Monitor'], tags: [], owner: true},
      {name: 'Atatus',  family: ['Monitor'], tags: [], owner: true},
      {name: 'UpTime CloudWatch',  family: ['Monitor'], tags: [], owner: true},
      {name: 'Ruxit',  family: ['Monitor'], tags: [], owner: true},
      {name: 'Stackify',  family: ['Monitor'], tags: [], owner: true},
      {name: 'Solarwinds',  family: ['Monitor'], tags: [], owner: true},
      {name: 'LogicMonitor',  family: ['Monitor'], tags: [], owner: true},
      {name: 'Okmeter.io',  family: ['Monitor'], tags: [], owner: true},
      {name: 'PageDuty',  family: ['Monitor'], tags: [], owner: true},
      {name: 'Logz.io (ELK Stack)',  family: ['Monitor', 'Logs'], tags: ['logz'], owner: true},

      {name: 'Nagios',  family: ['Monitor'], tags: ['oss'], owner: false},
      {name: 'Zabbix',  family: ['Monitor'], tags: ['oss'], owner: false},
      {name: 'ELK Stack',  family: ['Monitor', 'Logs'], tags: ['oss'], owner: false},
      {name: 'GrayLog',  family: ['Monitor', 'Logs'], tags: ['oss'], owner: false},
      {name: 'Prometheus',  family: ['Monitor'], tags: ['oss', 'timeseries'], owner: false},
      {name: 'Sensu',  family: ['Monitor'], tags: ['oss'], owner: false},
      {name: 'InfluxDb',  family: ['Monitor', 'Logs'], tags: ['oss', 'timeseries'], owner: false},
      {name: 'Graphite',  family: ['Monitor', 'Logs'], tags: ['oss', 'timeseries'], owner: false},
      {name: 'OpenTSDB',  family: ['Monitor', 'Logs'], tags: ['oss', 'timeseries'], owner: false},


      {name: 'AWS Cloud Trails',  family: ['Logs'], tags: ['aws'], owner: true},
      {name: 'Splunk',  family: ['Logs'], tags: [], owner: true},
      {name: 'Papertrail',  family: ['Logs'], tags: [], owner: true},
      {name: 'Loggly',  family: ['Logs'], tags: [], owner: true},
      {name: 'AlertLogic Log Manager',  family: ['Logs'], tags: [], owner: true},
      {name: 'Tibco',  family: ['Logs'], tags: [], owner: true},
      {name: 'EventLogAnalyzer',  family: ['Logs'], tags: [], owner: true},
      {name: 'NetIQ',  family: ['Logs'], tags: [], owner: true},
      {name: 'LogRhythm',  family: ['Logs'], tags: [], owner: true},

      {name: 'Fluentd',  family: ['Logs'], tags: [], owner: false},
      {name: 'RSyslog',  family: ['Logs'], tags: [], owner: false},
      {name: 'Logstash',  family: ['Logs'], tags: [], owner: false},
      {name: 'Chukwa',  family: ['Logs'], tags: [], owner: false},
      {name: 'Telegraf',  family: ['Logs'], tags: [], owner: false},


      {name: 'S3 (AWS)',  family: ['ObjectStorage'], tags: ['aws'], owner: true},
      {name: 'Azure Storage',  family: ['ObjectStorage'], tags: ['azure'], owner: true},
      {name: 'Digital Ocean Storage',  family: ['ObjectStorage'], tags: ['do'], owner: true},
      {name: 'Google Cloud Storage',  family: ['Database'], tags: ['gcloud'], owner: true},

      {name: 'OpenStack Swift',  family: ['ObjectStorage'], tags: ['oss'], owner: false},
      {name: 'Ceph',  family: ['ObjectStorage'], tags: [], owner: false},
      {name: 'GlusterFS',  family: ['ObjectStorage'], tags: ['oss'], owner: false},
      {name: 'Cloudian',  family: ['ObjectStorage'], tags: [], owner: false},
      {name: 'IBM Spectrum Scale',  family: ['ObjectStorage'], tags: [], owner: false},
      {name: 'Scality',  family: ['ObjectStorage'], tags: [], owner: false},




      {name: 'MailChimp',  family: ['STMP'], tags: [], owner: true},
      {name: 'SendGrid',  family: ['STMP'], tags: [], owner: true},
      {name: 'SES (AWS)',  family: ['STMP'], tags: ['aws'], owner: true},
      {name: 'Mailgun',  family: ['STMP'], tags: [], owner: true},
      {name: 'Postmark',  family: ['STMP'], tags: [], owner: true},
      {name: 'Sender',  family: ['STMP'], tags: [], owner: true},
      {name: 'Mailjet',  family: ['STMP'], tags: [], owner: true},
      {name: 'Elastic Email',  family: ['STMP'], tags: [], owner: true},
      {name: 'Userfox',  family: ['STMP'], tags: [], owner: true},
      {name: 'Lob',  family: ['STMP'], tags: [], owner: true},
      {name: 'outMail',  family: ['STMP'], tags: [], owner: true},
      {name: 'SendBulls',  family: ['STMP'], tags: [], owner: true},
      {name: 'GetResponse',  family: ['STMP'], tags: [], owner: true},
      {name: 'Constant Contact',  family: ['STMP'], tags: [], owner: true},
      {name: 'Emma',  family: ['STMP'], tags: [], owner: true},
      {name: 'iContact',  family: ['STMP'], tags: [], owner: true},
      {name: 'SendInBlue',  family: ['STMP'], tags: [], owner: true},
      {name: 'Exact Target',  family: ['STMP'], tags: [], owner: true},
      {name: 'Locaweb SMTP',  family: ['STMP'], tags: ['locaweb'], owner: true},


      {name: 'Postfix',  family: ['STMP'], tags: ['oss'], owner: false},
      {name: 'Exim',  family: ['STMP'], tags: ['oss'], owner: false},
      {name: 'Sendmail',  family: ['STMP'], tags: ['oss'], owner: false},
      {name: 'Haraka',  family: ['STMP'], tags: [], owner: false},
      {name: 'Courier-MTA',  family: ['STMP'], tags: ['oss'], owner: false},
      {name: 'Microsoft SMTP Server (Exchange)',  family: ['STMP'], tags: ['microsoft'], owner: false},
      {name: 'PowerMTA',  family: ['STMP'], tags: [], owner: false},
      {name: 'OpenSMTPD',  family: ['STMP'], tags: [], owner: false},
      {name: 'Dragonfly Mail Agent',  family: ['STMP'], tags: [], owner: false},
      {name: 'sSMTP',  family: ['STMP'], tags: [], owner: false},
      {name: 'MailerQ',  family: ['STMP'], tags: [], owner: false},
      {name: 'Hectane',  family: ['STMP'], tags: [], owner: false},
      {name: 'BulkMTA',  family: ['STMP'], tags: [], owner: false},




      {name: 'GCE discovery',  family: ['ServiceDiscovery'], tags: [], owner: true},
      {name: 'Bluemix SD',  family: ['ServiceDiscovery'], tags: [], owner: true},

      {name: 'Hashcorp Consul',  family: ['ServiceDiscovery'], tags: ['hashcorp'], owner: false},
      {name: 'Etcd',  family: ['ServiceDiscovery'], tags: [], owner: false},
      {name: 'Eureka',  family: ['ServiceDiscovery'], tags: [], owner: false},
      {name: 'NSQ',  family: ['ServiceDiscovery'], tags: [], owner: false},
      {name: 'Serf',  family: ['ServiceDiscovery'], tags: [], owner: false},
      {name: 'SkyDNS',  family: ['ServiceDiscovery'], tags: [], owner: false},
      {name: 'Zookeeper',  family: ['ServiceDiscovery'], tags: [], owner: false},
      {name: 'Nerve SD',  family: ['ServiceDiscovery'], tags: [], owner: false},
      {name: 'Serverset SD',  family: ['ServiceDiscovery'], tags: [], owner: false},
      {name: 'Triton SD',  family: ['ServiceDiscovery'], tags: [], owner: false},



      {name: 'Vpn (AWS)',  family: ['VPN'], tags: ['aws'], owner: true},

      {name: 'OpenVPN',  family: ['VPN'], tags: [], owner: false},
      {name: 'OpenSwan',  family: ['VPN'], tags: [], owner: false},
      {name: 'Hacoon',  family: ['VPN'], tags: [], owner: false},
      {name: 'Check Point',  family: ['VPN'], tags: [], owner: false},
      {name: 'Cisco',  family: ['VPN'], tags: [], owner: false},




      {name: 'RDS (AWS)',  family: ['Database', 'MySql', 'Oracle'], tags: ['aws'], owner: true},
      {name: 'Aurora (AWS)', family: ['MySql'], tags: ['relational', 'aws'], owner: true},
      {name: 'DynamoDB (AWS)',  family: ['Database'], tags: ['aws', 'key-value', 'nosql'], owner: true},
      {name: 'Relational (Azure)',  family: ['Database'], tags: ['azure'], owner: true},
      {name: 'BigQuey (Google)',  family: ['Database'], tags: ['nosql'], owner: true},
      {name: 'Caspio',  family: ['Database'], tags: [], owner: true},
      {name: 'IBM Cloudant',  family: ['Database'], tags: [], owner: true},
      {name: 'Zoho Creator',  family: ['Database'], tags: [], owner: true},
      {name: 'MongoCloud',  family: ['Database'], tags: ['document', 'nosql'], owner: true},

      {name: 'Oracle MySQL', family: ['MySql'], tags: ['oracle', 'relational'], owner: false},
      {name: 'Enterprise MySQL', family: ['MySql'], tags: ['oracle', 'relational'], owner: false},
      {name: 'MariaDB', family: ['MySql'], tags: ['relational'], owner: false},
      {name: 'Percona', family: ['MySql'], tags: ['relational'], owner: false},

      {name: 'Oracle Database', family: ['Oracle'], tags: ['oracle', 'relational'], owner: false},
      {name: 'Oracle NoSQL', family: ['Oracle'], tags: ['oracle'], owner: false},
      {name: 'Oracle Coherence', family: ['Oracle'], tags: ['oracle'], owner: false},

      {name: 'PostGres',  family: ['Database'], tags: [], owner: false},
      {name: 'FireBird',  family: ['Database'], tags: [], owner: false},
      {name: 'MSSql',  family: ['Database'], tags: ['microsoft'], owner: false},
      {name: 'NexusDB',  family: ['Database'], tags: ['nosql'], owner: false},
      {name: 'ElasticSearch',  family: ['Database'], tags: ['nosql', 'search'], owner: false},
      {name: 'Apache Solr',  family: ['Database'], tags: ['nosql', 'search'], owner: false},
      {name: 'MongoDB',  family: ['Database'], tags: ['nosql', 'document'], owner: false},
      {name: 'CouchDB',  family: ['Database'], tags: ['nosql', 'document'], owner: false},
      {name: 'DatomicDB',  family: ['Database'], tags: ['nosql'], owner: false},
      {name: 'Neo4J',  family: ['Database'], tags: ['nosql', 'graph'], owner: false},
      {name: 'Cassandra',  family: ['Database'], tags: ['nosql', 'key-value'], owner: false},
      {name: 'HBase',  family: ['Database'], tags: ['nosql'], owner: false},
      {name: 'CloudData',  family: ['Database'], tags: ['nosql'], owner: false},
      {name: 'Druid',  family: ['Database'], tags: ['nosql'], owner: false},
      {name: 'ArangoDB',  family: ['Database'], tags: ['multi'], owner: false},
      {name: 'OrientDB',  family: ['Database'], tags: ['multi'], owner: false},
      {name: 'gunDB',  family: ['Database'], tags: [], owner: false},
      {name: 'RethinkDB',  family: ['Database'], tags: ['nosql'], owner: false},
      {name: 'Riak',  family: ['Database'], tags: ['nosql'], owner: false},
      {name: 'LevelDB',  family: ['Database'], tags: ['nosql', 'key-value'], owner: false},

      {name: 'Voldermort',  family: ['Database'], tags: ['nosql'], owner: false},
      {name: 'AlchemistDB',  family: ['Database'], tags: ['nosql'], owner: false},
      {name: 'VelocityDB',  family: ['Database'], tags: ['nosql'], owner: false},
      {name: 'InterBase',  family: ['Database'], tags: ['nosql'], owner: false},
      {name: 'InfluxDB',  family: ['Database'], tags: ['nosql', 'timeseries'], owner: false},
      {name: 'PromSQL',  family: ['Database'], tags: ['nosql', 'timeseries'], owner: false},
      {name: 'OpenTSDB',  family: ['Database'], tags: ['nosql', 'timeseries'], owner: false},
      {name: 'IBM DB2',  family: ['Database'], tags: [], owner: false},


      {name: 'DockerCloud', family: ['Repository'], tags: ['docker', 'registry'], owner: true},

      {name: 'Docker Registry', family: ['Repository'], tags: ['docker', 'registry'], owner: false},
      {name: 'Nexus Repository', family: ['Repository'], tags: ['docker', 'registry'], owner: false},



      {name: 'Html (Statics files)', family: ['Application'], tags: [], owner: false},
      {name: 'Ruby', family: ['Application'], tags: ['language'], owner: false},
      {name: 'Go', family: ['Application'], tags: ['language'], owner: false},
      {name: 'Scala', family: ['Application'], tags: ['language', 'functional'], owner: false},
      {name: 'Elixir', family: ['Application'], tags: ['language', 'functional'], owner: false},
      {name: 'Elm', family: ['Application'], tags: ['language'], owner: false},
      {name: 'Erlang', family: ['Application'], tags: ['language'], owner: false},
      {name: 'PHP (PHP-FPM)', family: ['Application'], tags: ['language'], owner: false},
      {name: 'PHP (CGI)', family: ['Application'], tags: ['language'], owner: false},
      {name: 'PHP (Hack)', family: ['Application'], tags: ['language'], owner: false},
      {name: 'NodeJS', family: ['Application'], tags: ['language'], owner: false},
      {name: 'Haskell', family: ['Application'], tags: ['language', 'functional'], owner: false},
      {name: 'Prolog', family: ['Application'], tags: ['language'], owner: false},
      {name: 'Python', family: ['Application'], tags: ['language'], owner: false},
      {name: 'Python (Jpython)', family: ['Application'], tags: ['language'], owner: false},
      {name: 'Python (Cpython)', family: ['Application'], tags: ['language'], owner: false},
      {name: 'C#', family: ['Application'], tags: ['language'], owner: false},
      {name: 'Rusty', family: ['Application'], tags: ['language'], owner: false},
      {name: 'OpenJDK (Java)', family: ['Application'], tags: ['language'], owner: false},
      {name: 'Oracle JDK (Java)', family: ['Application'], tags: ['oracle'], owner: false},


      {name: 'Ansible', tags: ['config-manager'], owner: false},
      {name: 'Apache HTTPD', tags: ['webservice', 'proxy'], owner: false},
      {name: 'Apache Storm', tags: ['events', 'realtime'], owner: false},
      {name: 'Apache Tomcat', tags: ['webservice', 'java'], owner: false},

      {name: 'Bind9', family: ['DNS'], owner: false},

      {name: 'Chef', tags: ['config-manager'], owner: false},
      {name: 'Docker', tags: ['container'], owner: false},
      {name: 'Drools', owner: false},
      {name: 'Grafana', tags: ['dashboard'], owner: false},
      {name: 'Hashcorp Vault', family: ['Database'], tags: ['crypt', 'key-value'], owner: false},
      {name: 'Hashcorp Terraform', tags: ['config-manager'], owner: false},
      {name: 'Hashcorp Packer', tags: ['config-manageer', 'image'], owner: false},
      {name: 'JBoss', tags: ['webservice', 'jvm'], owner: false},


      {name: 'CircleCI', family: ['CI/CD'], tags: ['cd', 'ci'], owner: true},
      {name: 'Travis', family: ['CI/CD'], tags: ['cd', 'ci'], owner: true},
      {name: 'CodeShip', family: ['CI/CD'], tags: ['cd', 'ci'], owner: true},
      {name: 'AppVeyor', family: ['CI/CD'], tags: ['cd', 'ci'], owner: true},
      {name: 'GitLabs Cloud', family: ['CI/CD'], tags: ['cd', 'ci'], owner: true},
      {name: 'Buddy', family: ['CI/CD'], tags: ['cd', 'ci'], owner: true},
      {name: 'Wercker', family: ['CI/CD'], tags: ['cd', 'ci'], owner: true},
      {name: 'Semaphore', family: ['CI/CD'], tags: ['cd', 'ci'], owner: true},
      {name: 'Solano Labs', family: ['CI/CD'], tags: ['cd', 'ci'], owner: true},

      {name: 'Jenkins', family: ['CI/CD'], tags: ['cd', 'ci'], owner: false},
      {name: 'Bamboo', family: ['CI/CD'], tags: ['cd', 'ci'], owner: false},
      {name: 'GitLabs', family: ['CI/CD'], tags: ['cd', 'ci'], owner: false},
      {name: 'PHPCI', family: ['CI/CD'], tags: ['cd', 'ci'], owner: false},
      {name: 'TeamCity', family: ['CI/CD'], tags: ['cd', 'ci'], owner: false},
      {name: 'GoCD', family: ['CI/CD'], tags: ['cd', 'ci'], owner: false},
      {name: 'Hudson', family: ['CI/CD'], tags: ['cd', 'ci'], owner: false},
      {name: 'Cruise Control', family: ['CI/CD'], tags: ['cd', 'ci'], owner: false},
      {name: 'Integrity', family: ['CI/CD'], tags: ['cd', 'ci'], owner: false},
      {name: 'StriderCD', family: ['CI/CD'], tags: ['cd', 'ci'], owner: false},


      {name: 'Microsoft Active Directory (AD)', family: ['Auth'], tags: ['microsoft'], owner: false},
      {name: 'LDAP', family: ['Auth'], tags: ['microsoft'], owner: false},
      {name: 'FreeIPA', family: ['Auth'], tags: ['microsoft'], owner: false},


      {name: 'Microsoft IIS', tags: ['microsoft', 'webservice'], owner: false},
      {name: 'Microsoft Sharepoint', tags: ['microsoft'], owner: false},
      {name: 'Microsoft Windows Server Update Service (WSUS)', tags: ['microsoft'], owner: false},

      {name: 'Kibana', tags: ['dashboard'], owner: false},
      {name: 'OurDelta', tags: [], owner: false},
      {name: 'Drizzle', tags: [], owner: false},


      {name: 'Oracle EBS (Service BUS)', tags: ['oracle', 'jms', 'ebs'], owner: false},
      {name: 'Oracle Enterprise Manager', tags: ['oracle'], owner: false},
      {name: 'Oracle Forms and Reports', tags: ['oracle'], owner: false},
      {name: 'Oracle Forms Runtime', tags: ['oracle'], owner: false},
      {name: 'Oracle GlassFish', tags: ['oracle', 'webservice'], owner: false},

      {name: 'Oracle WebLogic Server', tags: ['oracle', 'webservice'], owner: false},

      {name: 'Puppet', tags: ['config-manager'], owner: false},

      {name: 'Salt', family: ['config-manager'], tags: [], owner: false},
      {name: 'Samba', family: ['NAS'], tags: [], owner: false},
      {name: 'Serv-V', tags: [], owner: false},
      {name: 'Squid', family: ['Proxy'], tags: [], owner: false}
    ];

    let result = list.map(e => Object.assign(e, attach));
    result = _.uniqBy(result, o=>o.name);

    pets.insertMany(result, next);
};

exports.down = function (db, next) {
    db.collection('services').remove(next);
};
