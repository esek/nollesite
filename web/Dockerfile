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
COPY package*.json ./

RUN npm ci
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build


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
RUN npm ci --production

EXPOSE 3000
CMD [ "npm", "run", "start" ]
