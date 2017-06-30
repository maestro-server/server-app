[![Code Climate](https://codeclimate.com/github/maestro-server/server-app/badges/gpa.svg)](https://codeclimate.com/github/maestro-server/server-app) [![Build Status](https://travis-ci.org/maestro-server/server-app.svg?branch=master)](https://travis-ci.org/maestro-server/server-app) [![Issue Count](https://codeclimate.com/github/maestro-server/server-app/badges/issue_count.svg)](https://codeclimate.com/github/maestro-server/server-app) [![david-dm.org](https://david-dm.org/maestro-server/server-app.svg)](https://david-dm.org/)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/12101716a7a64a07a38c8dd0ea645606)](https://www.codacy.com/app/maestro/server-app?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=maestro-server/server-app&amp;utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/github/maestro-server/server-app/badge.svg?branch=master)](https://coveralls.io/github/maestro-server/server-app?branch=master)

# Maestro Server - Server API #

Core API, organized by modules:

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


## Dependencies ##
* NodeJS >6.10
* npm
* MongoDB 3.XX
* SMTP Servers
* AWS S3 Account

## Setup #
Create .env file, with:

PORT=8888
NODE_ENV=development

MONGO_URL='localhost/maestro-client'

SECRETJWT=''

SECRETJWT_FORGOT=''

SECRET_CRYPTO_FORGOT=''

SMTP_PORT=1025

SMTP_HOST=localhost

SMTP_SENDER='felipeklerkk@XXXX'

SMTP_IGNORE=true

AWS_ACCESS_KEY_ID=''

AWS_SECRET_ACCESS_KEY=''

AWS_DEFAULT_REGION=us-east-1

S3_BUCKET_NAME=maestroserver
