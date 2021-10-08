FROM docker.artifactory.abb-win.akbars.ru/nginx

RUN  rm /etc/apt/sources.list && \
curl -o /tmp/artifactory.list http://artifactory.abb-win.akbars.ru:8081/artifactory/prep-local/artifactory.list && \
cp /tmp/artifactory.list /etc/apt/sources.list.d && \
     apt-get update -y --allow-unauthenticated && \
     apt-get install -y libbsd0 && \
     rm -rf /var/lib/apt/lists/* && \
     apt-get -y autoremove && \
     apt-get clean

RUN rm /etc/nginx/conf.d/default.conf

RUN chmod -R 770 /var/cache/nginx/ /var/run

COPY --chown=nginx:nginx build /usr/share/nginx/html

COPY --chown=nginx:nginx deploy/nginx.conf /etc/nginx

#OPY 30-addfrontendenv.sh /docker-entrypoint.d/

RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log

RUN chgrp 0 /etc/nginx/nginx.conf && \
    chmod g+w /etc/nginx/nginx.conf && \
#    chmod +x /docker-entrypoint.d/30-addfrontendenv.sh && \
#    chmod 666 /usr/share/nginx/html/env.js && \
    chmod g+w /etc/nginx/conf.d && \
    chmod -R 770 /var/cache/nginx/ /var/run

EXPOSE 5000

CMD ["nginx", "-g", "daemon off;"]
