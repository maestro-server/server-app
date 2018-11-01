#!/bin/sh

if [[ -z "${SKIP_MIGRATION}" ]]; then
  echo "Bootstrapping === "
  npm run migrate
fi

pm2-docker start --json pm2.json
