FROM keymetrics/pm2-docker-alpine:latest

# Bundle APP files
WORKDIR /data

COPY app/ app/
COPY templates templates/
COPY package.json .
COPY pm2.json .
COPY server.js .

RUN npm install --only=production

CMD [ "pm2-docker", "start", "--json", "pm2.json" ]
