FROM keymetrics/pm2:6
MAINTAINER maestro@maestroserver.io

# Bundle APP files
WORKDIR /data

COPY app/ app/
COPY templates templates/
COPY migrations migrations/
COPY .migration-config.js .
COPY package.json .
COPY pm2.json .
COPY server.js .

RUN apk --no-cache add --virtual native-deps g++ gcc libgcc libstdc++ linux-headers make python
RUN npm install --only=production
RUN npm rebuild bcrypt --build-from-source

CMD [ "pm2-docker", "start", "--json", "pm2.json" ]
