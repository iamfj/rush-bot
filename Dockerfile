FROM node:17-alpine

WORKDIR /usr/rush
COPY ./dist/rush.js /usr/rush
COPY ./package.json /usr/rush
COPY ./yarn.lock /usr/rush
COPY ./strategies /usr/rush/strategies

RUN yarn install --prod \
 && rm package.json yarn.lock

EXPOSE 3000

CMD ["node", "./rush.js"]