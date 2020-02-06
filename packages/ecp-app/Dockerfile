# build stage
FROM node:lts-alpine as build-stage

RUN mkdir -p /home/node/ecp-app
WORKDIR /home/node/ecp-app

ENV PATH=/home/node/ecp-app/node_modules/.bin:$PATH

COPY ./package.json /home/node/ecp-app/
COPY ./babel.config.js /home/node/ecp-app/
COPY ./vue.config.js /home/node/ecp-app/
COPY ./src /home/node/ecp-app/src
#COPY public /home/node/ecp-app/public

RUN npm install -g @vue/cli --registry=https://registry.npm.taobao.org && yarn install --no-lockfile && yarn build

#RUN yarn install --no-lockfile && yarn build
#RUN yarn build
