FROM keymetrics/pm2:8-alpine
RUN apk --no-cache add --virtual native-deps g++ gcc libgcc libstdc++ linux-headers make python tini

# Bundle APP files
WORKDIR /data

COPY docker-entrypoint.sh /usr/local/bin/

COPY ./ ./
RUN mkdir -p /data/public/static/users/ && mkdir -p /data/public/static/teams/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
RUN npm install --only=production
RUN npm rebuild bcrypt --build-from-source

ENTRYPOINT ["/sbin/tini","-g","--"]
CMD ["docker-entrypoint.sh"]
