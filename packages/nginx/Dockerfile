FROM nginx:latest

COPY --from=billxiong/ecp-app /home/node/ecp-app/dist /usr/share/nginx/html

# RUN rm /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
