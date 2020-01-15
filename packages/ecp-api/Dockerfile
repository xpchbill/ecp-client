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

ARG VUE_APP_NAME=ECP_APP
ARG VUE_APP_DOMAIN=localhost
ARG VUE_APP_SERVER_URL=http://localhost:6002/ecp
ARG VUE_APP_BROKER_URL=ws://localhost:3033
ARG VUE_APP_API_URL=http://localhost:3033/rest/v1
ARG VUE_APP_LOGGER_LEVEL=4

ENV VUE_APP_NAME=$VUE_APP_NAME
ENV VUE_APP_DOMAIN=$VUE_APP_DOMAIN
ENV VUE_APP_SERVER_URL=$VUE_APP_SERVER_URL
ENV VUE_APP_BROKER_URL=$VUE_APP_BROKER_URL
ENV VUE_APP_API_URL=$VUE_APP_API_URL
ENV VUE_APP_LOGGER_LEVEL=$VUE_APP_LOGGER_LEVEL

RUN yarn install --no-lockfile
