const faker = require('./faker/faker');
const request = require('request');


for (var i = 0; i < 1400; i++) {

    var options = {
        url: 'http://localhost:8888/applications',
        headers: {
            'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1OTQwNTI5M2EyN2Y5MjYxMTNkMDZiNzQiLCJuYW1lIjoibmFtZSIsImVtYWlsIjoicUBxLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA2JEJBYkhxeUdTUmRIQkg0bngxaVdFSWVXNFhkVnRPZUdobGlKMUZIenIuVHh4NVY5bTBZZ3UuIn0.9wtUFUegreXCQdBmulrFBftnaUqmQ1E4RPmOC6petC4'
        },
        form: {
            name: faker.lorem.words(),
            description: faker.lorem.sentence(),
            system: [faker.random.uuid()],
            servers: [faker.random.uuid(), faker.random.uuid()],
            role: faker.random.arrayElement(["App", 'LoadBalance', 'Containers', 'Banco de dados', 'Worker']),
            meta: {
                spec: {
                    name: "app",
                    link: faker.internet.url(),
                    slug: faker.lorem.slug()
                },
                customer_type: faker.random.arrayElement(["Gerenciado", 'Compartilhado']),
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
