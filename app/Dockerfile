FROM node:15.3.0 as builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json .
COPY ./.yarnrc .
COPY ./yarn.lock .
RUN yarn
COPY . .
RUN yarn build

FROM busybox
WORKDIR /app
COPY --from=builder /app/build build
