# build stage
FROM node:lts-alpine as build-stage

RUN mkdir -p /home/node/ecp-api
WORKDIR /home/node/ecp-api

ENV PATH=/home/node/ecp-api/node_modules/.bin:$PATH

COPY ./package.json /home/node/ecp-api/
COPY ./routes.json /home/node/ecp-api/
COPY ./server.js /home/node/ecp-api/
COPY ./datasets /home/node/ecp-api/datasets
COPY ./middlewares /home/node/ecp-api/middlewares

RUN yarn install --no-lockfile
