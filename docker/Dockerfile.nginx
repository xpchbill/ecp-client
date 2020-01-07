FROM nginx:latest

COPY --from=billxiong/ecp-app /home/node/ecp-app/dist /etc/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
