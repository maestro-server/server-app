#!/bin/sh

npm run migrate
pm2-docker start --json pm2.json
