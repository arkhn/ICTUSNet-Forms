FROM node:15.3.0
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json .
COPY ./.yarnrc .
COPY ./yarn.lock .
RUN yarn
COPY . .
RUN yarn build
