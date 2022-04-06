ARG NODE_VERSION=16-alpine

##
## Build
##
FROM node:${NODE_VERSION} as BUILD_IMAGE

ENV WORKING_DIR=/usr/src/app

# Create app directory
WORKDIR $WORKING_DIR

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./
COPY next.config.js ./next.config.js

RUN yarn install --frozen-lockfile
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN yarn build


##
## Create runtime image
##
FROM node:${NODE_VERSION}

ENV WORKING_DIR=/usr/src/app
LABEL project="nollesite"

# Create app directory
WORKDIR $WORKING_DIR

COPY --from=BUILD_IMAGE $WORKING_DIR/.next ./.next
COPY --from=BUILD_IMAGE $WORKING_DIR/package*.json ./
COPY --from=BUILD_IMAGE $WORKING_DIR/yarn.lock ./
COPY --from=BUILD_IMAGE $WORKING_DIR/next.config.js ./
COPY --from=BUILD_IMAGE $WORKING_DIR/public ./
RUN yarn install --frozen-lockfile --production

RUN apk add curl
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3\
 CMD [ "curl", "--fail", "--silent", "--output", "/dev/null", "localhost:3000/api/health" ]

EXPOSE 3000
CMD [ "yarn", "start" ]
