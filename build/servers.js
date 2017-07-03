
const faker = require('./faker/faker');
const request = require('request');


for (var i=0; i<1400; i++) {

  var options = {
    url: 'http://localhost:8888/servers',
    headers: {
      'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1OTQwNTI5M2EyN2Y5MjYxMTNkMDZiNzQiLCJuYW1lIjoibmFtZSIsImVtYWlsIjoicUBxLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA2JEJBYkhxeUdTUmRIQkg0bngxaVdFSWVXNFhkVnRPZUdobGlKMUZIenIuVHh4NVY5bTBZZ3UuIn0.9wtUFUegreXCQdBmulrFBftnaUqmQ1E4RPmOC6petC4'
    },
    form: {
      hostname: "back0"+faker.random.number(1500),
      ipv4_public: faker.internet.ip(),
      ipv4_private: faker.internet.ip(),
      cpu: faker.random.number(8),
      memory: faker.random.number(16),
      active: 1,
      os: {
        base: faker.random.arrayElement(['Linux', 'Windows']),
        dist: faker.random.arrayElement(['Centos', 'Ubuntu']),
        version: "7"
      },
      storage: [
        {
          name: '/dev/xvda',
          root: true,
          size: faker.random.number(15, 250)+'GB'
        }
      ],
      services: [
        {name: "Python",version: "2.7"},
        faker.random.arrayElement([{name: "PHP",version: "7"},  {name: "JVM",version: "8"}, {name: "Ruby",version: "2.4"}]),
        faker.random.arrayElement([{name: "Docker",version: "12"},  {name: "Ansible",version: "2"}, null])
      ],
      dc: faker.random.arrayElement(
        [{
        name: "aws",
        zone: "sa-east-sa",
        instance_type: faker.random.arrayElement(["m3.medium", 't2.micro', 'r3.xlarge']),
        instance_id: "uisdgvsdifuysd",
        ami: "GFDFGISDUGBjdghfrybjs",
        iam: faker.random.arrayElement(["", '', "codedeploy"]),
        public_dns: faker.internet.ip()+".sa-east-1.compute.amazonaws.com",
        private_dns: "ip-"+faker.internet.ip()+".sa-east-1.compute.internal",
        vpc_id: "vpc-437e2b26",
        subnet_id: "subnet-67"
      }, {
        name: "openstack",
        zone: "br-sp",
        instnace: "m3.medium"
      }]),
      auth: [{
        name: "pki",
        admin: "ec2-user",
        key_file: "master.pem"
      }],
      meta: {
        role: faker.random.arrayElement(["Application", 'Container', 'Database']) + " Server",
        environment: faker.random.arrayElement(["Production", 'Staging', 'Development'])
      }
    }
  };

  request.post(
      options,
      function (error, response, body) {
        console.log(body);
      }
  );
}
