FROM keymetrics/pm2:6-alpine
MAINTAINER maestro@maestroserver.io

# Bundle APP files
WORKDIR /data

COPY docker-entrypoint.sh /usr/local/bin/
<<<<<<< HEAD
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

=======
>>>>>>> 77d533faf933e1c6564253e3c99c0157050e0bae
COPY app/ app/
COPY templates templates/
COPY migrations migrations/
COPY .migration-config.js .
COPY package.json .
COPY pm2.json .
COPY server.js .

<<<<<<< HEAD
RUN apk --no-cache add --virtual native-deps g++ gcc libgcc libstdc++ linux-headers make python tini
=======
RUN apk --no-cache add --virtual tini native-deps g++ gcc libgcc libstdc++ linux-headers make python
>>>>>>> 77d533faf933e1c6564253e3c99c0157050e0bae
RUN npm install --only=production
RUN npm rebuild bcrypt --build-from-source

ENTRYPOINT ["/sbin/tini","-g","--"]
CMD ["docker-entrypoint.sh"]
