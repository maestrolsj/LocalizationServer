########################################################################
#                            Nginx stuff                               #
########################################################################

# Base image used
FROM nginx:alpine

# For staging and production this was overwritten by kubernetes e.g with https://headhunter.staging.softgarden.io/referral/api/v1
ENV REACT_APP_API_BASE_URL=http://localhost:4001/graphql

# Make sure nginx html folder is clear
RUN rm -rf /usr/share/nginx/html/*

# Copy application build and root language detection and nginx custom config
COPY build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Copy entrypoint shell script and make it executable to replace relative API paths with absolute paths injected from docker environment variable
COPY entrypoint.sh /
RUN chmod u+x /entrypoint.sh

# Run nginx
CMD ["-g", "daemon off;"]
ENTRYPOINT ["/entrypoint.sh"]