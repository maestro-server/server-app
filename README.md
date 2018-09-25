[![Code Climate](https://codeclimate.com/github/maestro-server/server-app/badges/gpa.svg)](https://codeclimate.com/github/maestro-server/server-app) [![Build Status](https://travis-ci.org/maestro-server/server-app.svg?branch=master)](https://travis-ci.org/maestro-server/server-app) [![Issue Count](https://codeclimate.com/github/maestro-server/server-app/badges/issue_count.svg)](https://codeclimate.com/github/maestro-server/server-app) 
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/12101716a7a64a07a38c8dd0ea645606)](https://www.codacy.com/app/maestro/server-app?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=maestro-server/server-app&amp;utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/github/maestro-server/server-app/badge.svg?branch=master)](https://coveralls.io/github/maestro-server/server-app?branch=master)

# Maestro Server #

Maestro Server is an open source software platform for management and discovery servers, apps and system for Hybrid IT. Can manage small and large environments, be able to visualize the latest multi-cloud environment state.

### Demo ###
To test out the demo, [Demo Online](http://demo.maestroserver.io "Demo Online")

## Documentation ##
* [UserGuide](http://docs.maestroserver.io/en/latest/userguide/cloud_inventory/inventory.html "User Guide")
* [API Contract](https://maestro-server.github.io/server-app/docs/inventory/index.html "API Contract")

# Maestro Server - Server API #

Server App is main application, yours responsibility is:

 - Authentication and authorization
 - Validate and create entities (crud ops)
 - Proxy to others micro services

We using DDD to organize the code, has infra, repositories, entities (values objects), interfaces, application, and domain.

![arch](http://docs.maestroserver.io/en/latest/_images/fluxo_data.png)

Constructed with KrakenJs, we create a lot of middleware and organize by domain.

**Core API, organized by modules:**

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

## TechStack ##

* NodeJs 8.11.2
* MongoDB 3.4
* AWS S3 (If using S3 upload)

## Service relations ##
* Maestro Discovery
* Maestro Reports
* Maestro Analytics
* Maestro Analytics Front

## Setup ##

#### Installation by docker ####

```bash
docker run -p 8888:8888  -e "MAESTRO_MONGO_URI=mongodb" -e "MAESTRO_MONGO_DATABASE=maestro-client" -e "MAESTRO_DISCOVERY_URI=http://discovery:5000" -e "MAESTRO_REPORT_URI=http://reports:5005" maestroserver/server-maestro
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
    - "MAESTRO_MONGO_URI=mongodb"
    - "MAESTRO_MONGO_DATABASE=maestro-client"
    - "MAESTRO_DISCOVERY_URI=http://discovery:5000"
    - "MAESTRO_REPORT_URI=http://reports:5005"
    - "MAESTRO_ANALYTICS_URI=http://analytics:5020"
    - "MAESTRO_ANALYTICS_FRONT_URI=http://analytics_front:9999"
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
MAESTRO_MONGO_URI='localhost'
MAESTRO_MONGO_DATABASE='maestro-client'
MAESTRO_DISCOVERY_URI=http://localhost:5000 // used in connection
MAESTRO_REPORT_URI=http://localhost:5005 // used in reports
MAESTRO_ANALYTICS_URI=http://analytics:5020 // used in analytics
MAESTRO_ANALYTICS_FRONT_URI=http://analytics_front:9999 // used in analytics front
```

Development

Install nodejs, version above 7.6, mongodb need to be running.

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

| Env Variables                        | Example                  | Description                    |
|--------------------------------------|--------------------------|--------------------------------|
| MAESTRO_PORT                         | 8888                     |                                |
| NODE_ENV                             | development|production   |                                |
| MAESTRO_MONGO_URI                    | localhost                |  DB string connection          |
| MAESTRO_MONGO_DATABASE               | maestro-client           |  Database name                 |
| MAESTRO_SECRETJWT                    | XXXX                     |  Secret key - session          |
| MAESTRO_SECRETJWT_FORGOT             | XXXX                     |  Secret key - forgot request   |
| MAESTRO_SECRET_CRYPTO_FORGOT         | XXXX                     |  Secret key - forgot content   |
| MAESTRO_SECRETJWT_PUBLIC_ANALYTICS   | XXXX                     |  Secret key - public shared    |
|                                      |                          |                                |
| MAESTRO_DISCOVERY_URI                | http://localhost:5000    |  Url discovery-app (flask)     |
| MAESTRO_REPORT_URI                   | http://localhost:5005    |  Url reports-app (flask)       |
| MAESTRO_ANALYTICS_URI                | http://localhost:5020    |  Url Analytics-app (flask)     |
| MAESTRO_ANALYTICS_FRONT_URI          | http://localhost:9999    |  Url Analytics Front-app (node)|
| MAESTRO_TIMEOUT                      | 1000                     |  Timeout micro service request |
| SMTP_PORT                            | 1025                     |                                |
| SMTP_HOST                            | localhost                |                                |
| SMTP_SENDER                          | felipeklerkk@XXXX        |                                |
| SMTP_IGNORE                          | true|false               |                                |
| SMTP_USETSL                          | true|false               |                                |
| SMTP_USERNAME                        |                          |                                |
| SMTP_PASSWORD                        |                          |                                |
| AWS_ACCESS_KEY_ID                    | XXXX                     |                                |
| AWS_SECRET_ACCESS_KEY                | XXXX                     |                                |
| AWS_DEFAULT_REGION                   | us-east-1                |                                |
| AWS_S3_BUCKET_NAME                   | maestroserver            |                                |
| MAESTRO_UPLOAD_TYPE                  | S3/Local                 |  Upload mode                   |
| LOCAL_DIR                            | /public/static/          |  Where files will be uploaded  |
| PWD                                  | $rootDirectory           |  PWD process                   |

### Contribute ###

Are you interested in developing Maestro Server, creating new features or extending them?

We created a set of documentation, explaining how to set up your development environment, coding styles, standards, learn about the architecture and more. Welcome to the team and contribute with us.

[See our developer guide](http://docs.maestroserver.io/en/latest/contrib.html)
