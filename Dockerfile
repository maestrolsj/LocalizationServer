FROM node:latest

WORKDIR /app

COPY . .

# RUN if [ "$NODE_ENV" = "test" ] ; then npm install -g jest ; fi

# RUN if [ "$NODE_ENV" = "staging" ] ; then npm run build ; fi
# RUN if [ "$NODE_ENV" = "staging" ] ; then npm install -g pm2 ; fi

# RUN if [ "$NODE_ENV" = "production" ] ; then npm run build; fi
# RUN if [ "$NODE_ENV" = "production" ] ; then npm install -g pm2 ; fi
RUN yarn
RUN yarn global add jest pm2

ENTRYPOINT [ "npx","pm2","start","npm","--no-daemon", "--", "start" ]
