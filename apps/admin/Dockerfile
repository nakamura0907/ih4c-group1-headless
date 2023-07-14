FROM node:current-alpine

# Let WatchTower know to ignore this container for checking
# LABEL com.centurylinklabs.watchtower.enable="false"

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

# ENV NODE_ENV production

RUN npm run build

EXPOSE 1337


RUN chown -R node:node /app
USER node

# CMD ["npm", "run", "develop"]
