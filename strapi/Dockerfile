FROM node:18-alpine

ENV NODE_ENV production

WORKDIR /app

COPY package.json .

COPY yarn.lock .

RUN yarn install --frozen-lockfile --ignore-engines

COPY . ./

RUN mkdir -p ./public/uploads

RUN yarn build

EXPOSE 1337

RUN apk add curl
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3\
    CMD [ "curl", "--fail", "localhost:1337" ]

CMD ["yarn", "deploy"]

