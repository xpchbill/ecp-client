FROM nginx:latest

COPY --from=billxiong/ecp-app /home/node/ecp-app/dist /etc/nginx/html
COPY ./nginx-local.template /etc/nginx/nginx.conf

RUN rm /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
