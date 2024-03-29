[![Code Climate](https://codeclimate.com/github/maestro-server/server-app/badges/gpa.svg)](https://codeclimate.com/github/maestro-server/server-app) [![Build Status](https://travis-ci.com/maestro-server/server-app.svg?branch=master)](https://travis-ci.com/maestro-server/server-app) [![Issue Count](https://codeclimate.com/github/maestro-server/server-app/badges/issue_count.svg)](https://codeclimate.com/github/maestro-server/server-app)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/ba6b63c8b73d408eaf09e7860b05e734)](https://www.codacy.com/gh/maestro-server/server-app/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=maestro-server/server-app&amp;utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/github/maestro-server/server-app/badge.svg?branch=master)](https://coveralls.io/github/maestro-server/server-app?branch=master)

# Maestro Server #

Maestro Server is an open source software platform for management and discovery servers, apps and system for Hybrid IT. Can manage small and large environments, be able to visualize the latest multi-cloud environment state.

### Demo ###
To test out the demo, [Demo Online](http://demo.maestroserver.io "Demo Online")

## Documentation ##
* [UserGuide](http://docs.maestroserver.io/en/latest/userguide/cloud_inventory/inventory.html "User Guide")
* [API Contract](https://maestro-server.github.io/server-app/inventory/index.html "API Contract")

# Maestro Server - Server API #

Server app is the main service; also they act as a middleware to authenticate and authorize users, it connect to the database and connect to others services.

* Authentication and authorization
* Validate and create entities (crud ops)
* Proxy to others services

------

* Server is made with `KrakenJs <http://krakenjs.com/>`_.
* We use DDD to organize the code, they have an infra, repositories, entities (values objects), interfaces, application, and domain folders. `DDD in Node Apps <https://blog.codeminer42.com/nodejs-and-good-practices-354e7d763626>`_


![arch](http://docs.maestroserver.io/en/latest/_images/fluxo_data.png)

**Core API:**

* Core
* Profile and authetication
* Teams
* Projects
* Architectures
* Applications
* Cloud Inventory
* System
* Clients
* Servers
* Reports
* Events
* Analytics
* Graphs
* Jobs
* Inventory

## TechStack: ##

* NodeJs 8.11.2
* MongoDB 3.4
* AWS S3 (If using S3 upload)

## Connect to: ##
* Maestro Discovery
* Maestro Reports
* Maestro Analytics
* Maestro Analytics Front
* Maestro Audit

## Setup ##

#### Installation by docker ####

```bash
docker run -p 8888:8888  -e "MAESTRO_MONGO_URI=mongodb://localhost:27017" -e "MAESTRO_MONGO_DATABASE=maestro-client" -e "MAESTRO_DISCOVERY_URI=http://discovery:5000" -e "MAESTRO_REPORT_URI=http://reports:5005" -e "MAESTRO_ANALYTICS_URI=http://analytics:5020" -e "MAESTRO_AUDIT_URI=http://audit:10900" maestroserver/server-maestro
```
Or by docker-compose

```bash
version: '2'

services:
    server:
    image: maestroserver/server-maestro
    ports:
    - "8888:8888"
    environment:
    - "MAESTRO_MONGO_URI=mongodb://localhost:27017"
    - "MAESTRO_MONGO_DATABASE=maestro-client"
    - "MAESTRO_DISCOVERY_URI=http://discovery:5000"
    - "MAESTRO_REPORT_URI=http://reports:5005"
    - "MAESTRO_ANALYTICS_URI=http://analytics:5020"
    - "MAESTRO_AUDIT_URI=http://audit:10900"
```

#### Dev Env ####

Setup mongodb and fake smtp

```bash
cd devtools/

docker-compose up -d
```

Configure database and port application in .env file

```bash
MAESTRO_PORT=8888
MAESTRO_MONGO_URI='mongodb://localhost:27017'
MAESTRO_MONGO_DATABASE='maestro-client'
MAESTRO_DISCOVERY_URI=http://localhost:5000 // used in connection
MAESTRO_REPORT_URI=http://localhost:5005 // used in reports
MAESTRO_ANALYTICS_URI=http://analytics:5020 // used in analytics
MAESTRO_AUDIT_URI=http://audit:10900 // used in audit
```

Development

Install nodejs, version above 7.6, and mongodb need to be running.

```bash
npm install
npm run migrate //populate mongodb
npm run server
```

Run all tests or any test type

```bash
mocha test/**/*js --reporter spec

gulp test_e2e
gulp test_unit
gulp eslint
```


### Env variables ###

| Env Variables                        | Example                      | Description                                                                 |
|--------------------------------------|------------------------------|-----------------------------------------------------------------------------|
| MAESTRO_PORT                         | 8888                         |                                                                             |
| NODE_ENV                             | development|production       |                                                                             |
| MAESTRO_MONGO_URI                    | mongodb://localhost:27017    | DB string connection                                                        |
| MAESTRO_MONGO_DATABASE               | maestro-client               | Database name                                                               |
|                                      |                              |                                                                             |
| MAESTRO_SECRETJWT                    | XXXX                         | Secret key - session                                                        |
| MAESTRO_SECRETJWT_FORGOT             | XXXX                         | Secret key - forgot request                                                 |
| MAESTRO_SECRET_CRYPTO_FORGOT         | XXXX                         | Secret key - forgot content                                                 |
| MAESTRO_SECRETJWT_PUBLIC             | XXXX                         | Secret key - public shared                                                  |
| MAESTRO_SECRETJWT_PRIVATE            | XXX                          | Secret Key - JWT private connections                                        |
| MAESTRO_NOAUTH                       | XXX                          | Secret Pass to validate private connections                                 |
|                                      |                              |                                                                             |
| MAESTRO_DISCOVERY_URI                | http://localhost:5000        | Url Discovery-app (flask)                                                   |
| MAESTRO_REPORT_URI                   | http://localhost:5005        | Url Reports-app (flask)                                                     |
| MAESTRO_ANALYTICS_URI                | http://localhost:5020        | Url Analytics-app (flask)                                                   |
| MAESTRO_AUDIT_URI                    | http://localhost:10900       | Url Audit-app (krakenjs)                                                    |
| MAESTRO_TIMEOUT                      | 1000                         | Timeout micro service request                                               |
|                                      |                              |                                                                             |
| SMTP_PORT                            | 1025                         |                                                                             |
| SMTP_HOST                            | localhost                    |                                                                             |
| SMTP_SENDER                          | felipeklerkk@XXXX            |                                                                             |
| SMTP_IGNORE                          | true|false                   |                                                                             |
| SMTP_USETLS                          | true|false                   |                                                                             |
| SMTP_USERNAME                        |                              |                                                                             |
| SMTP_PASSWORD                        |                              |                                                                             |
|                                      |                              |                                                                             |
| AWS_ACCESS_KEY_ID                    | XXXX                         |                                                                             |
| AWS_SECRET_ACCESS_KEY                | XXXX                         |                                                                             |
| AWS_DEFAULT_REGION                   | us-east-1                    |                                                                             |
| AWS_S3_BUCKET_NAME                   | maestroserver                |                                                                             |
| AWS_S3_PRIVATE_BUCKET_NAME           | privatemaestro               | Used to upload internal files, as an example ansible facts and tf states    |
| AWS_ENDPOINT                         | ny3.spacesdigitalocean       | S3 endpoint                                                                 |
| MAESTRO_UPLOAD_TYPE                  | S3/Local                     | Upload mode                                                                 |
| LOCAL_DIR                            | /public/static               | Upload public folder, as an example avatar images.                          |
| PRIVATE_LOCAL_DIR                    | /private                     | Upload private folder, as an example ansible facts json.                    |
| MAESTRO_TMP                          | $rootDirectory               | Tmp folder used on upload files process                                     |
|                                      |                              |                                                                             |
| MAESTRO_AUDIT_DISABLED               | false                        | Disable the audit service                                                   |
| MAESTRO_REPORT_DISABLED              | false                        | Disable the report service                                                  |
| MAESTRO_DISCOVERY_DISABLED           | false                        | Disable the discovery service                                               |
| MAESTRO_UPLOAD_MAXSIZE               | 16302400                     | Upload max size allowed in bytes                                            |
| MAESTRO_UPLOAD_MINSIZE               | 1                            | Upload min size allowed in bytes                                            | 

### Contribute ###

Are you interested in developing Maestro Server, creating new features or extending them?

We created a set of documentation, explaining how to set up your development environment, coding styles, standards, learn about the architecture and more. Welcome to the team and contribute with us.

[See our developer guide](http://docs.maestroserver.io/en/latest/contrib.html)

### Contact ###

We may be able to resolve support queries via email. [Please send me a message here](https://maestroserver.typeform.com/to/vf6sGR)

### Donate ###

I have made Maestro Server with my heart, think to solve a real operation IT problem. Its not easy, take time and resources.

The donation will be user to:

- Create new features, implement new providers.
- Maintenance libs, securities flaws, and technical points.

<a href="https://www.buymeacoffee.com/9lVypB7WQ" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/purple_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

### Sponsor ###

[<img src="docs/_imgs/jetbrains.png" width="100">](https://www.jetbrains.com/?from=maestroserver) 
