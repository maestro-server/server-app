[![Code Climate](https://codeclimate.com/github/maestro-server/server-app/badges/gpa.svg)](https://codeclimate.com/github/maestro-server/server-app) [![Build Status](https://travis-ci.org/maestro-server/server-app.svg?branch=master)](https://travis-ci.org/maestro-server/server-app) [![Issue Count](https://codeclimate.com/github/maestro-server/server-app/badges/issue_count.svg)](https://codeclimate.com/github/maestro-server/server-app) [![david-dm.org](https://david-dm.org/maestro-server/server-app.svg)](https://david-dm.org/)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/12101716a7a64a07a38c8dd0ea645606)](https://www.codacy.com/app/maestro/server-app?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=maestro-server/server-app&amp;utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/github/maestro-server/server-app/badge.svg?branch=master)](https://coveralls.io/github/maestro-server/server-app?branch=master)

# Maestro Server #

Maestro Server is an open source software platform for management and discovery servers, apps and system for Hybrid IT. Can manage small and large environments, be able to visualize the latest multi-cloud environment state.

### Demo ###
To test out the demo, [Demo Online](http://demo.maestroserver.io "Demo Online")

# Maestro Server - Server API #

Server App is main application, yours responsibility is:

 - Authentication and authorization
 - Validate and create entities (crud ops)
 - Proxy to others micro services
 - Unique service can be access by world (besides websocket api)

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
* Playbooks
* Jobs
* Inventory

## TechStack ##

* NodeJs 6.10
* MongoDB 3.4
* AWS S3 (If using S3 upload)

## Service relations ##
* Maestro Discovery
* Maestro Reports
* Maestro Remote Agent
* Maestro Authenticator


## Setup ##

#### Installation by docker ####

```bash
docker run -p 8888:8888 -e "MAESTRO_PORT=8888" -e "MAESTRO_MONGO_URI=mongodb/maestro-client" -e "MAESTRO_DISCOVERY_TIMEOUT=10000" -e "MAESTRO_DISCOVERY_URL=http://discovery:5000" maestroserver/server-maestro
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
- "MAESTRO_PORT=8888"
- "MAESTRO_MONGO_URI=mongodb/maestro-client"
- "MAESTRO_DISCOVERY_TIMEOUT=10000"
- "MAESTRO_DISCOVERY_URL=http://discovery:5000"
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
MAESTRO_MONGO_URI='localhost/maestro-client'
```

Run all tests or any test type

```bash
mocha test/**/*js --reporter spec

gulp test_e2e
gulp test_unit
gulp eslint
```


### Env variables ###

| Env Variables                | Example                  | Description                |
|------------------------------|--------------------------|----------------------------|
| MAESTRO_PORT                 | 8888                     | NODE_ENV                   |
| NODE_ENV                     | development|production   |                            |
| MAESTRO_MONGO_URI            | localhost/maestro-client | DB string connection       |
| MAESTRO_SECRETJWT            | XXXX                     |                            |
| MAESTRO_SECRETJWT_FORGOT     | XXXX                     |                            |
| MAESTRO_SECRET_CRYPTO_FORGOT | XXXX                     |                            |
| MAESTRO_DISCOVERY_URL        | http://localhost:5000    | Url discovery-app (flask)  |
| MAESTRO_REPORT_URL           | http://localhost:5005    | Url reports-app (flask)    |
| SMTP_PORT                    | 1025                     |                            |
| SMTP_HOST                    | localhost                |                            |
| SMTP_SENDER                  | felipeklerkk@XXXX        |                            |
| SMTP_IGNORE                  | true|false               |                            |
| AWS_ACCESS_KEY_ID            | XXXX                     |                            |
| AWS_SECRET_ACCESS_KEY        | XXXX                     |                            |
| AWS_DEFAULT_REGION           | us-east-1                |                            |
| AWS_S3_BUCKET_NAME           | maestroserver            |                            |
| MAESTRO_UPLOAD_TYPE          | S3/Local                 | Upload mode                |
| LOCAL_DIR                    | /public/static/          | Where files willb uploaded |

### Contribute ###

Are you interested in developing Maestro Server, creating new features or extending them?

We created a set of documentation, explaining how to set up your development environment, coding styles, standards, learn about the architecture and more. Welcome to the team and contribute with us.

[See our developer guide](http://docs.maestroserver.io/en/latest/contrib.html)