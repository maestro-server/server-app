const faker = require('./faker/faker');
const request = require('request');


for (var i = 0; i < 1400; i++) {

    var options = {
        url: 'http://localhost:8888/servers',
        headers: {
            'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1OTNmNDliZTQyZDNlZDk3MzkwZjI1YTciLCJuYW1lIjoiYXdyd2VydyIsImVtYWlsIjoiYUBhLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA2JGFPZnI1Y2FaZmF6NmRwMWc4S0NHa2VieXpPakpOajlUdVNHSERDS0dRd1g3TkF0OUtNWlhpIn0.Gv1WP7CcfNFxY4tmZzk3B-Iw7iK-E_9mG8XnK9-iSxA'
        },
        form: {
            hostname: "back0" + faker.random.number(1500),
            ipv4_public: faker.internet.ip(),
            ipv4_private: faker.internet.ip(),
            cpu: 1+faker.random.number(8),
            memory: 1+faker.random.number(16),
            status: faker.random.arrayElement(['Active', 'Avaliable']),
            active: 1,
            os: {
                base: faker.random.arrayElement(['Linux', 'Windows', 'Solaris', 'FreeBSD', 'MacOS']),
                dist: faker.random.arrayElement(['Centos', 'Ubuntu']),
                version: "7"
            },
            storage: [
                {
                    name: '/dev/xvda',
                    root: true,
                    size: 100
                }
            ],
            services: [
                {name: "Python", version: "2.7"},
                faker.random.arrayElement([
                  {name: "PHP", version: "7"}, {name: "JVM", version: "8"}, {name: "Ruby",version: "2.4"}
                  ]),
                faker.random.arrayElement([{name: "Docker", version: "12"}, {name: "Ansible", version: "2"} ])
            ],
            dc: faker.random.arrayElement(
                [{
                    name: "aws",
                    zone: "sa-east-sa",
                    instance_type: faker.random.arrayElement(["m3.medium", 't2.micro', 'r3.xlarge']),
                    instance_id: "uisdgvsdifuysd",
                    ami: "GFDFGISDUGBjdghfrybjs",
                    iam: faker.random.arrayElement(["", '', "codedeploy"]),
                    public_dns: faker.internet.ip() + ".sa-east-1.compute.amazonaws.com",
                    private_dns: "ip-" + faker.internet.ip() + ".sa-east-1.compute.internal",
                    vpc_id: "vpc-437e2b26",
                    subnet_id: "subnet-67",
                    type: faker.random.arrayElement(["virtual", 'exadata', 'physical'])
                }, {
                    name: "openstack",
                    zone: "br-sp",
                    instance: "m3.medium"
                }]),
            auth: [{
                name: faker.random.arrayElement(["master", "root", faker.name.findName(), faker.name.findName()]),
                type: faker.random.arrayElement(['PKI', 'AD', 'LDAP', 'Password']),
                username: "ec2-user"
            }],
            role: faker.random.arrayElement(['Application', 'Cache', 'Container', 'Database', 'File', 'Loadbalance', 'Monitoring', 'NAT', 'Proxy', 'SMTP', 'VPN', 'Standard']),
            environment: faker.random.arrayElement(["Production", 'Staging', 'Development', 'UTA']),
            tags: {}
        }
    };

    request.post(
        options,
        function (error, response, body) {
            console.log(body);
        }
    );
}
