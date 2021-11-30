FROM node:17-alpine

WORKDIR /usr/rush
COPY ./dist/rush.js /usr/rush
COPY ./package.json /usr/rush
COPY ./yarn.lock /usr/rush
COPY ./strategies /usr/rush/strategies

RUN apk update && apk add --virtual build-dependencies curl
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | sh -s -- -b /usr/local/bin
RUN apk del build-dependencies
RUN yarn install --frozen-lockfile --prod --flat
RUN npm prune --production
RUN /usr/local/bin/node-prune
RUN rm -rf /var/cache/apk/* package.json yarn.lock /usr/local/bin/node-prune.sh

EXPOSE 3000

CMD ["node", "./rush.js"]