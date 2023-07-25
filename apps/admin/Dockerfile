FROM node:lts-buster AS development

# Let WatchTower know to ignore this container for checking
# LABEL com.centurylinklabs.watchtower.enable="false"

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

RUN npm ci

COPY . /usr/src/app

# ENV NODE_ENV production

RUN npm run build

EXPOSE 1337


# RUN chown -R node:node /usr/src/app
# USER node

# CMD ["npm", "run", "develop"]
