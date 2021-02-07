FROM node:latest

WORKDIR /app

COPY . .

RUN yarn

RUN yarn global add pm2

ENTRYPOINT [ "npx","pm2","start","npm","--no-daemon", "--", "start" ]
